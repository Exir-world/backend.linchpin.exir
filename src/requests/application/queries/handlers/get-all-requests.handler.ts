import { RequestRepository } from '../../ports/request.repository';
import { RequestDomain } from 'src/requests/domain/request';
import { GetAllRequestsQuery } from '../get-all-requests.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetAllRequestsQuery)
export class GetAllRequestsHandler implements IQueryHandler<GetAllRequestsQuery> {
    constructor(private readonly requestRepository: RequestRepository) { }

    async execute(query: GetAllRequestsQuery): Promise<RequestDomain[]> {
        return await this.requestRepository.findByStatus(query.status);
    }
}
