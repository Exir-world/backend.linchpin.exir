import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { GetCreteriaByOrgIdQuery } from '../get-creteria-by-org-id.query';
import { OrganizationCriterionEntity } from 'src/organization/infrastructure/entities/organization-criterion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationCriterionsMapper } from 'src/organization/infrastructure/mappers/organization-criterions.mapper';

@QueryHandler(GetCreteriaByOrgIdQuery)
export class GetCriteriaByOrgIdHandler implements IQueryHandler<GetCreteriaByOrgIdQuery> {
    constructor(
        @InjectRepository(OrganizationCriterionEntity)
        private readonly criterionRepository: Repository<OrganizationCriterionEntity>) { }

    async execute(query: GetCreteriaByOrgIdQuery): Promise<any> {
        const organizationId = query.orgId;

        const criteria = await this.criterionRepository.find({ where: { organizationId } });
        return OrganizationCriterionsMapper.toDomainList(criteria);
    }
}