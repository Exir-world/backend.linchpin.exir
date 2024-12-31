import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { AttendanceRepository } from '../../ports/attendance.repository';
import { GetMonthlyReportQuery } from '../get-monthly-report.query';

@QueryHandler(GetMonthlyReportQuery)
export class GetMonthlyReportHandler implements IQueryHandler<GetMonthlyReportQuery> {
    constructor(
        private readonly attendanceRepo: AttendanceRepository,
    ) { }

    async execute(query: GetMonthlyReportQuery): Promise<any> {
        return this.attendanceRepo.getMonthlyReports(query.userId, query.monthAgo);
    }
}
