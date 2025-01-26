import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTimesByOrgIdQuery } from '../get-times-by-org-id.query';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationEntity } from 'src/organization/infrastructure/entities/organization.entity';
import { Repository } from 'typeorm';
import { OrganizationTimesEntity } from 'src/organization/infrastructure/entities/organization-times.entity';
import { OrganizationTimesMapper } from 'src/organization/infrastructure/mappers/organization-times.mapper';

@QueryHandler(GetTimesByOrgIdQuery)
export class GetTimesByOrgIdHandler implements IQueryHandler<GetTimesByOrgIdQuery> {
    constructor(
        @InjectRepository(OrganizationEntity)
        private readonly organizationRepository: Repository<OrganizationEntity>,
        @InjectRepository(OrganizationTimesEntity)
        private readonly timesRepository: Repository<OrganizationTimesEntity>,) { }

    async execute(query: GetTimesByOrgIdQuery): Promise<any> {
        const organizationId = query.orgId;

        const times = await this.timesRepository.find({ where: { organizationId }, order: { startTime: 'ASC' } });
        return OrganizationTimesMapper.toDomainList(times, true);
    }
}