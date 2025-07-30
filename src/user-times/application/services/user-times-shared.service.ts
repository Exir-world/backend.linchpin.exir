import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetLatestAllUserTimesQuery } from '../queries/get-latest-all-user-times.query';
import { GetLatestUserTimesQuery } from '../queries/get-latest-user-times.query';
import { UserTimesEntity } from 'src/user-times/infrastructure/entities/user-times.entity';

@Injectable()
export class UserTimesSharedService {
    constructor(
        private readonly queryBus: QueryBus,
    ) { }

    async getLatestUserTimesForAll(): Promise<any[]> {
        return this.queryBus.execute(new GetLatestAllUserTimesQuery());
    }

    async getLatestUserTimesForUser(userId: number): Promise<UserTimesEntity | null> {
        return this.queryBus.execute(new GetLatestUserTimesQuery(userId));
    }
}