import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FilterAttendancesByAdminQuery } from '../filter-attendances-admin.query';
import { AttendanceRepository } from '../../ports/attendance.repository';

@QueryHandler(FilterAttendancesByAdminQuery)
export class FilterAttendancesByAdminHandler implements IQueryHandler<FilterAttendancesByAdminQuery> {
    constructor(private readonly attendanceRepository: AttendanceRepository) { }

    async execute(query: FilterAttendancesByAdminQuery): Promise<any> {
        const { userId, startDate, endDate } = query;
        return this.attendanceRepository.filterByUserAndRange(userId, startDate, endDate, true);
    }
}