import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserLeavesQuery } from '../get-user-leaves.query';
import { LeaveRepository } from '../../ports/leave.repository';
import { Leave } from 'src/leave/domain/leave';

@QueryHandler(GetUserLeavesQuery)
export class GetUserLeavesHandler implements IQueryHandler<GetUserLeavesQuery> {
    constructor(
        private readonly leaveRepository: LeaveRepository,
    ) { }

    async execute(query: GetUserLeavesQuery): Promise<Leave[]> {
        return await this.leaveRepository.getUserLeaveRequests(query.userId);
    }
}
