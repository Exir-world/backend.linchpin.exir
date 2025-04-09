import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { AttendanceRepository } from '../../ports/attendance.repository';
import { ILeaveSharedRepository } from '../../ports/leave-shared.repository';
import { DateUtil } from 'src/common/utils/date.util';
import { Inject } from '@nestjs/common';
import { LeaveTypeEnum } from 'src/leave/domain/enums/leave-type.enum';
import { GetAttendancesReportQuery } from '../get-attendances-report.query';

@QueryHandler(GetAttendancesReportQuery)
export class GetAttendancesReportHandler implements IQueryHandler<GetAttendancesReportQuery> {
    constructor(
        private readonly attendanceRepo: AttendanceRepository,
        @Inject('ILeaveSharedRepository')
        private readonly leaveRepo: ILeaveSharedRepository,
    ) { }

    async execute(query: GetAttendancesReportQuery): Promise<any> {
        const { userId, startDate, endDate } = query;

        const attendances = await this.attendanceRepo.filterByUserAndRange(userId, new Date(startDate), new Date(endDate), true);
        const groupedAttendances = Object.entries(attendances.reduce((acc, attendance) => {
            const date = DateUtil.fromJsDate(attendance.checkIn).toISODate();
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(attendance);
            return acc;
        }, {}))
            .map(([date, attendances]: any) => {
                const firstCheckIn = attendances.reduce((earliest, current) => {
                    return current.checkIn < earliest.checkIn ? current : earliest;
                }).checkIn;

                const lastCheckOut = attendances.reduce((latest, current) => {
                    return current.checkOut > latest.checkOut ? current : latest;
                }).checkOut;

                const workTime = attendances.reduce((total, record) => {
                    const checkIn = DateUtil.fromJsDate(record.checkIn);
                    const checkOut = record.checkOut ? DateUtil.fromJsDate(record.checkOut) : checkIn;
                    const attendanceMinutes = checkOut.diff(checkIn, 'minutes').minutes;

                    const stopsMinutes = record.stops.reduce((stopTotal, stop) => {
                        const stopStart = DateUtil.fromJsDate(stop.startTime);
                        const stopEnd = stop.endTime ? DateUtil.fromJsDate(stop.endTime) : stopStart;
                        return stopTotal + stopEnd.diff(stopStart, 'minutes').minutes;
                    }, 0);

                    return total + (attendanceMinutes - stopsMinutes);
                }, 0);

                return {
                    date,
                    shamsiDate: DateUtil.convertToJalaliWithDayOfWeek(date),
                    firstCheckIn,
                    lastCheckOut,
                    workTime: Math.floor(workTime / 60),
                };
            });

        const title = `گزارش عملکرد ${DateUtil.convertToJalaliWithMonthName(startDate)}`;

        // محاسبه مجموع ساعات مرخصی ماهانه
        const leaves = await this.leaveRepo.filterByUserAndRange(userId, new Date(startDate), new Date(endDate));
        const leavesDuration = { days: 0, minutes: 0 };
        for (let i = 0; i < leaves.length; i++) {
            const leave = leaves[i];
            switch (leave.type) {
                case LeaveTypeEnum.DAILY:
                case LeaveTypeEnum.SICK:
                    leavesDuration.days += DateUtil.dateDifferenceInDays(leave.startTime, leave.endTime) + 1;
                case LeaveTypeEnum.HOURLY:
                    leavesDuration.minutes += DateUtil.dateDifferenceInMinutes(leave.startTime, leave.endTime);
            }
        }

        // محاسبه مجموع زمان کار
        const workMinutes = attendances.reduce((total, record) => {
            const checkIn = DateUtil.fromJsDate(record.checkIn);
            const checkOut = record.checkOut ? DateUtil.fromJsDate(record.checkOut) : checkIn;

            // محاسبه زمان حضور (Attendance Duration)
            const attendanceMinutes = checkOut.diff(checkIn, 'minutes').minutes;

            // محاسبه زمان توقف (Stops Duration)
            const stopsMinutes = record.stops.reduce((stopTotal, stop) => {
                const stopStart = DateUtil.fromJsDate(stop.getStartTime);
                const stopEnd = stop.getEndTime ? DateUtil.fromJsDate(stop.getEndTime) : stopStart;
                return stopTotal + stopEnd.diff(stopStart, 'minutes').minutes;
            }, 0);

            return total + (attendanceMinutes - stopsMinutes);
        }, 0);

        return {
            title,
            attendanceMinutes: Math.floor(workMinutes / 60),
            workMinutes: Math.floor(workMinutes / 60),
            overDuration: Math.floor(Math.max(workMinutes - 12480, 0) / 60),
            lessDuration: Math.floor(Math.max(12480 - workMinutes, 0) / 60),
            leaveWithPayrollDuration: Math.floor((leavesDuration.days * 24 * 60 + leavesDuration.minutes) / 60),
            leaveWithoutPayrollDuration: Math.floor((leavesDuration.days * 24 * 60 + leavesDuration.minutes) / 60),
            attendances: groupedAttendances.sort((a, b) => b.date.localeCompare(a.date)),
        };
    }
}
