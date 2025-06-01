import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUserCheckPointsQuery } from '../get-user-check-points.query';
import { UserCheckPointEntity } from 'src/user-check-points/infrastructure/entities/user-check-point.entity';

@QueryHandler(GetUserCheckPointsQuery)
export class GetUserCheckPointsHandler implements IQueryHandler<GetUserCheckPointsQuery> {
    constructor(
        @InjectRepository(UserCheckPointEntity)
        private readonly repo: Repository<UserCheckPointEntity>,
    ) { }

    async execute(query: GetUserCheckPointsQuery) {
        return this.repo.find({
            where: { userId: query.userId },
            relations: ['attachments'],
            order: { createdAt: 'DESC' },
        });
    }
}