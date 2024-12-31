import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetLastAttendanceQuery } from '../get-last-attendance.query';
import { AttendanceRepository } from '../../ports/attendance.repository';
import { DateUtil } from 'src/common/utils/date.util';

@QueryHandler(GetLastAttendanceQuery)
export class GetLastAttendanceHandler implements IQueryHandler<GetLastAttendanceQuery> {
    constructor(private readonly attendanceRepo: AttendanceRepository) { }

    async execute(query: GetLastAttendanceQuery): Promise<any> {
        let attendance = await this.attendanceRepo.findLastByUserId(query.userId);
        if (!attendance || attendance.getCheckIn < DateUtil.startOfDay())
            return null;

        return attendance;
    }
}
