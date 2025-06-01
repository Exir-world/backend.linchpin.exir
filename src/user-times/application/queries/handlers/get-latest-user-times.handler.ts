import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetLatestUserTimesQuery } from '../get-latest-user-times.query';
import { UserTimesEntity } from 'src/user-times/infrastructure/entities/user-times.entity';

@QueryHandler(GetLatestUserTimesQuery)
export class GetLatestUserTimesHandler implements IQueryHandler<GetLatestUserTimesQuery> {
    constructor(
        @InjectRepository(UserTimesEntity)
        private readonly userTimesRepo: Repository<UserTimesEntity>,
    ) { }

    async execute(query: GetLatestUserTimesQuery): Promise<UserTimesEntity | null> {
        return await this.userTimesRepo.findOne({
            where: { userId: query.userId },
            relations: ['weeklyTimes'],
            order: { createdAt: 'DESC' },
        });
    }
}
