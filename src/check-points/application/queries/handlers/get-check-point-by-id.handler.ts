import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCheckPointByIdQuery } from '../get-check-point-by-id.query';
import { CheckPointEntity } from 'src/check-points/infrastructure/entities/check-point.entity';

@QueryHandler(GetCheckPointByIdQuery)
export class GetCheckPointByIdHandler implements IQueryHandler<GetCheckPointByIdQuery> {
    constructor(
        @InjectRepository(CheckPointEntity)
        private readonly checkPointRepo: Repository<CheckPointEntity>,
    ) { }

    async execute(query: GetCheckPointByIdQuery): Promise<CheckPointEntity | null> {
        return await this.checkPointRepo.findOne({
            where: { id: query.id },
            relations: ['items'],
        });
    }
}