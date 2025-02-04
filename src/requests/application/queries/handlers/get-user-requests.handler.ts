import { RequestRepository } from '../../ports/request.repository';
import { GetUserRequestsQuery } from '../get-user-requests.query';
import { RequestDomain } from 'src/requests/domain/request';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetUserRequestsQuery)
export class GetUserRequestsHandler implements IQueryHandler<GetUserRequestsQuery> {
    constructor(private readonly requestRepository: RequestRepository) { }

    async execute(query: GetUserRequestsQuery): Promise<RequestDomain[]> {
        return await this.requestRepository.filterByTimeRangeAndStatus(
            query.userId,
            query.status,
            query.startTime,
            query.endTime,
        );
    }
}
