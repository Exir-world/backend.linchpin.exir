import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { AttendanceRepository } from '../../ports/attendance.repository';
import { ILeaveSharedRepository } from '../../ports/leave-shared.repository';
import { DateUtil } from 'src/common/utils/date.util';
import { Inject } from '@nestjs/common';
import { LeaveTypeEnum } from 'src/leave/domain/enums/leave-type.enum';
import { GetAttendancesQuery } from '../get-attendances.query';

@QueryHandler(GetAttendancesQuery)
export class GetAttendancesHandler implements IQueryHandler<GetAttendancesQuery> {
    constructor(
        private readonly attendanceRepo: AttendanceRepository,
        @Inject('ILeaveSharedRepository')
        private readonly leaveRepo: ILeaveSharedRepository,
    ) { }

    async execute(query: GetAttendancesQuery): Promise<any> {
        const { userId, startDate, endDate } = query;

        const attendances = await this.attendanceRepo.filterByUserAndRange(userId, startDate, endDate, true);
        return attendances;


        // const startTime = monthStarts[monthStarts.length - 1].startDate.toJSDate();
        // const endTime = monthStarts[0].startDate.plus({ months: 1 }).toJSDate()

        // const leaves = await this.leaveRepo.filterByUserAndRange(query.userId, startTime, endTime);


        //     // فیلتر رکوردها برای این ماه
        //     const monthRecords = attendances.filter(record => {
        //         const recordDate = DateUtil.fromJsDate(record.checkIn);
        //         return recordDate >= startOfMonth && recordDate < endOfMonth;
        //     });

        //     if (!monthRecords.length)
        //         return undefined;

        //     // فیلتر مرخصی های این ماه
        //     const leavesMonthRecords = leaves.filter(record => {
        //         const recordDate = DateUtil.fromJsDate(record.startTime);
        //         return recordDate >= startOfMonth && recordDate < endOfMonth;
        //     });

        //     // محاسبه مجموع زمان کار
        //     const workMinutes = monthRecords.reduce((total, record) => {
        //         const checkIn = DateUtil.fromJsDate(record.checkIn);
        //         const checkOut = record.checkOut ? DateUtil.fromJsDate(record.checkOut) : checkIn;

        //         // محاسبه زمان حضور (Attendance Duration)
        //         const attendanceMinutes = checkOut.diff(checkIn, 'minutes').minutes;

        //         // محاسبه زمان توقف (Stops Duration)
        //         const stopsMinutes = record.stops.reduce((stopTotal, stop) => {
        //             const stopStart = DateUtil.fromJsDate(stop.startTime);
        //             const stopEnd = stop.endTime ? DateUtil.fromJsDate(stop.endTime) : stopStart;
        //             return stopTotal + stopEnd.diff(stopStart, 'minutes').minutes;
        //         }, 0);

        //         return total + (attendanceMinutes - stopsMinutes);
        //     }, 0);

        //     const leavesDuration = { days: 0, minutes: 0 };
        //     for (let i = 0; i < leavesMonthRecords.length; i++) {
        //         const leave = leavesMonthRecords[i];
        //         switch (leave.type) {
        //             case LeaveTypeEnum.DAILY:
        //             case LeaveTypeEnum.SICK:
        //                 leavesDuration.days += DateUtil.dateDifferenceInDays(leave.startTime, leave.endTime) + 1;
        //             case LeaveTypeEnum.HOURLY:
        //                 leavesDuration.minutes += DateUtil.dateDifferenceInMinutes(leave.startTime, leave.endTime);
        //         }
        //     }

        //         workMinutes: Math.floor(workMinutes),
        //         overDuration: Math.floor(Math.max(workMinutes - monthHours, 0)),
        //         lessDuration: Math.floor(Math.max(monthHours - workMinutes, 0)),
        //         leaveDuration: leavesDuration.days * 24 * 60 + leavesDuration.minutes,

    }
}
