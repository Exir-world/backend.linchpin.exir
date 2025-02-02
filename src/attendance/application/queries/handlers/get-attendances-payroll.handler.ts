import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { AttendanceRepository } from '../../ports/attendance.repository';
import { GetAttendancesPayrollQuery } from '../get-attendances-payroll.query';

@QueryHandler(GetAttendancesPayrollQuery)
export class GetAttendancesPayrollHandler implements IQueryHandler<GetAttendancesPayrollQuery> {
    constructor(private readonly attendanceRepo: AttendanceRepository) { }

    async execute(query: GetAttendancesPayrollQuery): Promise<any> {
        let attendance = await this.attendanceRepo.findByUserIds(query.userIds);
        return attendance;
    }
}
