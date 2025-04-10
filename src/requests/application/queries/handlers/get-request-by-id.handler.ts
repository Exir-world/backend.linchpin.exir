import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRequestByIdQuery } from '../get-request-by-id.query';
import { RequestRepository } from '../../ports/request.repository';
import { RequestDomain } from 'src/requests/domain/request';
import { Inject } from '@nestjs/common';
import { UserSharedRepository } from 'src/auth/application/ports/user-shared.repository';

@QueryHandler(GetRequestByIdQuery)
export class GetRequestByIdHandler implements IQueryHandler<GetRequestByIdQuery> {
    constructor(
        private readonly requestRepository: RequestRepository,
        @Inject('UserSharedRepository')
        private readonly userSharedPort: UserSharedRepository,
    ) { }

    async execute(query: GetRequestByIdQuery): Promise<any> {
        const { requestId } = query;
        const request = await this.requestRepository.findOneById(requestId);
        const user = await this.userSharedPort.getUserById(request.userId);

        return { ...request, user };
    }
}