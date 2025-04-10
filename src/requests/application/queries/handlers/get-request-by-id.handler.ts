import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRequestByIdQuery } from '../get-request-by-id.query';
import { RequestRepository } from '../../ports/request.repository';
import { RequestDomain } from 'src/requests/domain/request';

@QueryHandler(GetRequestByIdQuery)
export class GetRequestByIdHandler implements IQueryHandler<GetRequestByIdQuery> {
    constructor(private readonly requestRepository: RequestRepository) { }

    async execute(query: GetRequestByIdQuery): Promise<RequestDomain> {
        const { requestId } = query;
        return this.requestRepository.findOneById(requestId);
    }
}