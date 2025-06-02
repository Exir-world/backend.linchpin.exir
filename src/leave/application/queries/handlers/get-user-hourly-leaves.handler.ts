import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LeaveRepository } from '../../ports/leave.repository';
import { Leave } from 'src/leave/domain/leave';
import { GetHourlyUserLeavesQuery } from '../get-user-hourly-leaves.query';

@QueryHandler(GetHourlyUserLeavesQuery)
export class GetHourlyUserLeavesHandler implements IQueryHandler<GetHourlyUserLeavesQuery> {
    constructor(
        private readonly leaveRepository: LeaveRepository,
    ) { }

    async execute(query: GetHourlyUserLeavesQuery): Promise<Leave[]> {
        return await this.leaveRepository.getUserHourlyLeaveRequests(query.userId, query.startDate, query.endDate);
    }
}
