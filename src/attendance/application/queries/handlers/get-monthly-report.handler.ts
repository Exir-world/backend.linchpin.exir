import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { AttendanceRepository } from '../../ports/attendance.repository';
import { GetMonthlyReportQuery } from '../get-monthly-report.query';
import { ILeaveSharedRepository } from '../../ports/leave-shared.repository';
import { DateUtil } from 'src/common/utils/date.util';
import { Inject } from '@nestjs/common';
import { LeaveTypeEnum } from 'src/leave/domain/enums/leave-type.enum';

@QueryHandler(GetMonthlyReportQuery)
export class GetMonthlyReportHandler implements IQueryHandler<GetMonthlyReportQuery> {
    constructor(
        private readonly attendanceRepo: AttendanceRepository,
        @Inject('ILeaveSharedRepository')
        private readonly leaveRepo: ILeaveSharedRepository,
    ) { }

    async execute(query: GetMonthlyReportQuery): Promise<any> {
        const dayHours = 45 * 8;
        const monthHours = dayHours * 24;
        const monthStarts = DateUtil.getStartOfPreviousMonths(query.monthAgo);

        const startTime = monthStarts[monthStarts.length - 1].startDate.toJSDate();
        const endTime = monthStarts[0].startDate.plus({ months: 1 }).toJSDate()

        const attendances = await this.attendanceRepo.filterByUserAndRange(query.userId, startTime, endTime);
        const leaves = await this.leaveRepo.filterByUserAndRange(query.userId, startTime, endTime);

        // گروه‌بندی و محاسبه زمان کار
        const workTimes = monthStarts.map((month) => {
            const startOfMonth = month.startDate;
            const endOfMonth = month.startDate.plus({ months: 1 });

            // فیلتر رکوردها برای این ماه
            const monthRecords = attendances.filter(record => {
                const recordDate = DateUtil.fromJsDate(record.checkIn);
                return recordDate >= startOfMonth && recordDate < endOfMonth;
            });

            if (!monthRecords.length)
                return undefined;

            // فیلتر مرخصی های این ماه
            const leavesMonthRecords = leaves.filter(record => {
                const recordDate = DateUtil.fromJsDate(record.startTime);
                return recordDate >= startOfMonth && recordDate < endOfMonth;
            });

            // محاسبه مجموع زمان کار
            const workMinutes = monthRecords.reduce((total, record) => {
                const checkIn = DateUtil.fromJsDate(record.checkIn);
                const checkOut = record.checkOut ? DateUtil.fromJsDate(record.checkOut) : checkIn;

                // محاسبه زمان حضور (Attendance Duration)
                const attendanceMinutes = checkOut.diff(checkIn, 'minutes').minutes;

                // محاسبه زمان توقف (Stops Duration)
                const stopsMinutes = record.stops.reduce((stopTotal, stop) => {
                    const stopStart = DateUtil.fromJsDate(stop.startTime);
                    const stopEnd = stop.endTime ? DateUtil.fromJsDate(stop.endTime) : stopStart;
                    return stopTotal + stopEnd.diff(stopStart, 'minutes').minutes;
                }, 0);

                return total + (attendanceMinutes - stopsMinutes);
            }, 0);

            const leaveMinutes = leavesMonthRecords.reduce((leaveTotal, leave) => {
                switch (leave.type) {
                    case LeaveTypeEnum.DAILY:
                    case LeaveTypeEnum.SICK:
                        const days = DateUtil.dateDifferenceInDays(leave.startTime, leave.endTime);
                        return days * dayHours
                    case LeaveTypeEnum.HOURLY:
                        return DateUtil.dateDifferenceInMinutes(leave.startTime, leave.endTime);
                }
                // const leaveStart = DateUtil.fromJsDate(leave.startTime);
                // const leaveEnd = leave.endTime ? DateUtil.fromJsDate(leave.endTime) : leaveStart;
                // return leaveTotal + leaveEnd.diff(leaveStart, 'minutes').minutes;
            }, 0);

            return {
                month: month.monthNumber,
                workMinutes: Math.floor(workMinutes) * 60,
                overDuration: Math.floor(Math.max(workMinutes - monthHours, 0)) * 60,
                lessDuration: Math.floor(Math.max(monthHours - workMinutes, 0)) * 60,
                leaveDuration: Math.floor(leaveMinutes) * 60,
            };
        }).filter(Boolean);

        return workTimes;
    }
}
