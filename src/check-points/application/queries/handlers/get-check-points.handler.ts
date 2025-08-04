import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCheckPointsQuery } from '../get-check-points.query';
import { CheckPointEntity } from 'src/check-points/infrastructure/entities/check-point.entity';

@QueryHandler(GetCheckPointsQuery)
export class GetCheckPointsHandler implements IQueryHandler<GetCheckPointsQuery> {
    constructor(
        @InjectRepository(CheckPointEntity)
        private readonly checkPointRepo: Repository<CheckPointEntity>,
    ) { }

    async execute(): Promise<CheckPointEntity[]> {
        return await this.checkPointRepo.find({ relations: ['items'] });
    }
}