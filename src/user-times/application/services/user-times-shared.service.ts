import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetLatestAllUserTimesQuery } from '../queries/get-latest-all-user-times.query';

@Injectable()
export class UserTimesSharedService {
    constructor(
        private readonly queryBus: QueryBus,
    ) { }

    async getLatestUserTimesForAll(): Promise<any[]> {
        return this.queryBus.execute(new GetLatestAllUserTimesQuery());
    }
}