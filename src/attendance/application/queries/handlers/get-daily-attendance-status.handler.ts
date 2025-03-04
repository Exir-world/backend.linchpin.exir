import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { AttendanceRepository } from '../../ports/attendance.repository';
import { DateUtil } from 'src/common/utils/date.util';
import { GetDailyAttendanceStatusQuery } from '../get-daily-attendance-status.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { IUserSharedRepository } from '../../ports/user-shared.repository';
import { Attendance } from 'src/attendance/domain/attendance';
import { I18nService } from 'nestjs-i18n';

@QueryHandler(GetDailyAttendanceStatusQuery)
export class GetDailyAttendanceStatusHandler implements IQueryHandler<GetDailyAttendanceStatusQuery> {
    constructor(
        private readonly attendanceRepo: AttendanceRepository,
        @Inject('IUserSharedRepository')
        private readonly userSharedRepository: IUserSharedRepository,
        private readonly i18n: I18nService,
    ) { }

    async execute(query: GetDailyAttendanceStatusQuery): Promise<any> {
        const user = await this.userSharedRepository.getUserById(query.userId);
        if (!user)
            throw new NotFoundException(this.i18n.t('auth.user.404'));

        const nowTehran = DateUtil.nowWithTimezone();

        const totalDailyMinutes = query.totalDuration;
        const eachTimeMinutes = query.currentDuration;

        let todayAttendances = await this.attendanceRepo.findTodayAttendance(query.userId);

        const workDuration = this.calculateWorkTimeInMinutes(todayAttendances);

        let currentStatus: string;
        if (!todayAttendances || !todayAttendances.length || todayAttendances.at(-1).checkOut)
            currentStatus = 'CHECKED_OUT'

        if (todayAttendances.length && todayAttendances.at(-1).checkIn && !todayAttendances.at(-1).checkOut)
            currentStatus = 'CHECKED_IN'

        if (todayAttendances.length && todayAttendances.at(-1).stops.length
            && !todayAttendances.at(-1).stops.sort((a, b) => a.getStartTime.getTime() - b.getStartTime.getTime()).at(-1).getEndTime)
            currentStatus = 'STOP'

        console.log(todayAttendances?.at(-1));


        return {
            nowDatetime: nowTehran,
            user,
            remainingDuration: Math.max(Math.floor((totalDailyMinutes - workDuration) * 60), 0),
            todayStartTime: DateUtil.formatDateToTehran(todayAttendances?.at(0)?.getCheckIn?.toISOString(), 'HH:mm'),
            lastEndTime: DateUtil.formatDateToTehran(
                todayAttendances?.at(-1)?.getCheckOut?.toISOString() || todayAttendances?.at(-2)?.getCheckOut?.toISOString(),
                'HH:mm'
            ),
            workDuration: Math.floor(workDuration * 60),
            currentStatus,
            lastStartTime: DateUtil.setTimezone(todayAttendances?.at(-1)?.getCheckIn),
            initTime: DateUtil.setTimezone(todayAttendances?.at(0)?.getCheckIn),
            endCurrentTime: DateUtil.addMinutes(todayAttendances?.at(0)?.getCheckIn, totalDailyMinutes),
            // endCurrentTime: DateUtil.addMinutes(todayAttendances?.at(-1)?.getCheckIn, eachTimeMinutes),
            endTodayTime: DateUtil.addMinutes(todayAttendances?.at(0)?.getCheckIn, totalDailyMinutes),
            // DateUtil.setTimezone(endOfDay),
            stopDuration: Math.floor(
                (!todayAttendances.length || todayAttendances?.at(-1)?.getCheckOut)
                    ? 0 : this.calculateStopsInMinutes(todayAttendances?.at(-1)) * 60
            ),
            currentDuration: Math.floor(workDuration * 60),
            // currentDuration: Math.floor(
            //     (!todayAttendances.length || todayAttendances?.at(-1)?.getCheckOut)
            //         ? 0 : this.calculateCurrentTimeWorkInMinutes(todayAttendances?.at(-1)) * 60
            // ),
            eachTimeDuration: eachTimeMinutes * 60,
            submitWorkReport: (todayAttendances?.at(-1)?.getCheckOut && !todayAttendances?.at(-1)?.workReport?.workReport) || false,
        }

    }

    private calculateWorkTimeInMinutes(attendances: Attendance[]): number {
        let duration = 0;
        for (let i = 0; i < attendances.length; i++) {
            const attendance = attendances[i];

            duration += DateUtil.dateDifferenceInMinutes(
                attendance.getCheckIn,
                attendance.getCheckOut || DateUtil.nowUTC()
            );

            const stopDuration = attendance.getStops.reduce((sum, stop) => {
                const startTime = stop.getStartTime;
                const endTime = stop.getEndTime || DateUtil.nowUTC();
                const diff = DateUtil.dateDifferenceInMinutes(startTime, endTime);

                return sum + diff;
            }, 0);

            duration -= stopDuration;
        }

        return duration;
    }

    private calculateStopsInMinutes(attendance: Attendance): number {
        if (!attendance || !attendance?.stops?.length)
            return 0;

        let duration = 0;
        for (let i = 0; i < attendance.stops.length; i++) {
            const stop = attendance.stops[i];
            duration += DateUtil.dateDifferenceInMinutes(
                stop.getStartTime,
                stop.getEndTime || DateUtil.nowUTC()
            );
        }

        return duration;
    }

    private calculateCurrentTimeWorkInMinutes(attendance: Attendance): number {
        if (!attendance)
            return 0;

        const currentDuration = DateUtil.dateDifferenceInMinutes(
            attendance.checkIn,
            attendance.checkOut || DateUtil.nowUTC()
        );

        const stopDuration = attendance.getStops.reduce((sum, stop) => {
            const startTime = stop.getStartTime;
            const endTime = stop.getEndTime || DateUtil.nowUTC();
            const diff = DateUtil.dateDifferenceInMinutes(startTime, endTime);

            return sum + diff;
        }, 0);


        return currentDuration - stopDuration
    }
}
