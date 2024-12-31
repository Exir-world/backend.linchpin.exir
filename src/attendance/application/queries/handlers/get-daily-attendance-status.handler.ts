import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { AttendanceRepository } from '../../ports/attendance.repository';
import { DateUtil } from 'src/common/utils/date.util';
import { GetDailyAttendanceStatusQuery } from '../get-daily-attendance-status.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { IUserSharedRepository } from '../../ports/user-shared.repository';
import { Attendance } from 'src/attendance/domain/attendance';

@QueryHandler(GetDailyAttendanceStatusQuery)
export class GetDailyAttendanceStatusHandler implements IQueryHandler<GetDailyAttendanceStatusQuery> {
    constructor(
        private readonly attendanceRepo: AttendanceRepository,
        @Inject('IUserSharedRepository')
        private readonly userSharedRepository: IUserSharedRepository
    ) { }

    async execute(query: GetDailyAttendanceStatusQuery): Promise<any> {
        const user = await this.userSharedRepository.getUserById(query.userId);
        if (!user)
            throw new NotFoundException('User notfound!');

        const utcNow = DateUtil.nowUTC();

        const totalDailyMinutes = 8 * 45;

        let todayAttendances = await this.attendanceRepo.findTodayAttendance(query.userId);

        const workDuration = this.calculateWorkTimeInMinutes(todayAttendances);

        return {
            now: utcNow,
            user,
            todayStartTime: DateUtil.setTimezone(todayAttendances?.at(0)?.getCheckIn),
            lastEndTime: DateUtil.setTimezone(todayAttendances?.at(-1)?.getCheckOut),
            workDuration,
            remainingDuration: totalDailyMinutes - workDuration
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

            console.log(attendance);


            const stopDuration = attendance.getStops.reduce((sum, stop) =>
                sum + DateUtil.dateDifferenceInMinutes(stop.getStartTime, stop.getEndTime || DateUtil.nowUTC()), 0);

            duration -= stopDuration;
        }

        return duration;
    }
}
