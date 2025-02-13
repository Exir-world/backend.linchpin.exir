import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetSelfImprovementsByOrgIdQuery } from '../get-self-improvements-by-org-id.query';
import { SelfImprovementEntity } from 'src/organization/infrastructure/entities/self-improvement.entity';
import { SelfImprovementMapper } from 'src/organization/infrastructure/mappers/self-improvement.mapper';

@QueryHandler(GetSelfImprovementsByOrgIdQuery)
export class GetSelfImprovementByOrgIdHandler implements IQueryHandler<GetSelfImprovementsByOrgIdQuery> {
    constructor(
        @InjectRepository(SelfImprovementEntity)
        private readonly repository: Repository<SelfImprovementEntity>) { }

    async execute(query: GetSelfImprovementsByOrgIdQuery): Promise<any> {
        const organizationId = query.orgId;

        const imps = await this.repository.find({ where: { organizationId }, relations: ['items'] });
        return SelfImprovementMapper.toDomainList(imps);
    }
}