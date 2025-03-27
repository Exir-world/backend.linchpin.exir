import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetSelfImprovementsSubItemsByItemIdQuery } from '../get-self-improvements-subitems-by-item-id.query';
import { SelfImprovementSubItemEntity } from 'src/organization/infrastructure/entities/self-improvement-subitem.entity';

@QueryHandler(GetSelfImprovementsSubItemsByItemIdQuery)
export class GetSelfImprovementsSubItemsByItemIdHandler implements IQueryHandler<GetSelfImprovementsSubItemsByItemIdQuery> {
    constructor(
        @InjectRepository(SelfImprovementSubItemEntity)
        private readonly repository: Repository<SelfImprovementSubItemEntity>) { }

    async execute(query: GetSelfImprovementsSubItemsByItemIdQuery): Promise<any> {
        const itemId = query.itemId;

        const imps = await this.repository.find({ where: { selfImprovementItem: { id: itemId } } });
        return imps;
    }
}