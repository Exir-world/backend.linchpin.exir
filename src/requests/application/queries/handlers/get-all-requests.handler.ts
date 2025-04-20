import { RequestRepository } from '../../ports/request.repository';
import { RequestDomain } from 'src/requests/domain/request';
import { GetAllRequestsQuery } from '../get-all-requests.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserSharedRepository } from 'src/auth/application/ports/user-shared.repository';
import { request } from 'http';

@QueryHandler(GetAllRequestsQuery)
export class GetAllRequestsHandler implements IQueryHandler<GetAllRequestsQuery> {
    constructor(
        private readonly requestRepository: RequestRepository,
        @Inject('UserSharedRepository')
        private readonly userSharedPort: UserSharedRepository,
    ) { }

    async execute(query: GetAllRequestsQuery): Promise<any[]> {
        const requests = await this.requestRepository.filterByUserIdAndStatus(query.status, query.userId);

        const users = await this.userSharedPort.getUserByIds(requests.map(request => request.userId));

        return requests.map(request => ({
            ...request,
            user: users.find(user => user.id === request.userId),
        }));
    }
}
