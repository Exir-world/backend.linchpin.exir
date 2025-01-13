import { Inject, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateRequestCommand } from '../commands/create-request.command';
import { ReviewRequestCommand } from '../commands/review-request.command';
import { GetUserRequestsQuery } from '../queries/get-user-requests.query';
import { GetAllRequestsQuery } from '../queries/get-all-requests.query';
import { CancelRequestCommand } from '../commands/cancel-request.command';
import { GetRequestTypesQuery } from '../queries/get-request-types.query';

@Injectable()
export class RequestService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    async createRequest(command: CreateRequestCommand): Promise<void> {
        return this.commandBus.execute(command);
    }

    async reviewRequest(command: ReviewRequestCommand): Promise<void> {
        return this.commandBus.execute(command);
    }

    async getUserRequests(query: GetUserRequestsQuery): Promise<any> {
        return this.queryBus.execute(query);
    }

    async getAllRequests(query: GetAllRequestsQuery) {
        return this.queryBus.execute(query);
    }

    async cancelRequestByUser(command: CancelRequestCommand) {
        return this.commandBus.execute(command);
    }

    async getRequestTypes(query: GetRequestTypesQuery): Promise<any[]> {
        return this.queryBus.execute(query);
    }
}
