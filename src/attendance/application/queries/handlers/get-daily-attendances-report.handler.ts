import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { AttendanceRepository } from '../../ports/attendance.repository';
import { ILeaveSharedRepository } from '../../ports/leave-shared.repository';
import { DateUtil } from 'src/common/utils/date.util';
import { Inject } from '@nestjs/common';
import { LeaveTypeEnum } from 'src/leave/domain/enums/leave-type.enum';
import { GetDailyAttendancesReportQuery } from '../get-daily-attendances-report.query';

@QueryHandler(GetDailyAttendancesReportQuery)
export class GetDailyAttendancesReportHandler implements IQueryHandler<GetDailyAttendancesReportQuery> {
    constructor(
        private readonly attendanceRepo: AttendanceRepository,
        @Inject('ILeaveSharedRepository')
        private readonly leaveRepo: ILeaveSharedRepository,
    ) { }

    async execute(query: GetDailyAttendancesReportQuery): Promise<any> {
        const { userId, date } = query;
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);

        const attendances = await this.attendanceRepo.filterByUserAndRange(userId, startDate, endDate, true);
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

        const title = `جزئیات ${DateUtil.convertToJalaliWithDayOfWeek(date)}`;

        return {
            title,
            attendanceMinutes: Math.floor(workMinutes),
            workMinutes: Math.floor(workMinutes),
            attendances: attendances.map(attendance => ({
                checkIn: attendance.checkIn,
                checkOut: attendance.checkOut,
            })),
        };
    }
}
