import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetFirebaseTokensQuery } from '../get-firebase-tokens.query';
import { UserSessionSharedRepository } from 'src/auth/application/ports/user-session-shared.repository';

@QueryHandler(GetFirebaseTokensQuery)
export class GetFirebaseTokensHandler implements IQueryHandler<GetFirebaseTokensQuery> {
    constructor(
        @Inject('UserSessionSharedRepository')
        private readonly userSessionSharedPort: UserSessionSharedRepository,
    ) { }

    async execute(query: GetFirebaseTokensQuery) {
        return this.userSessionSharedPort.getFirebaseTokens(query.userIds);
    }
}
