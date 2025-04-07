import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrganizationsByAdminIdQuery } from '../get-organizations-by-admin-id.query';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationEntity } from 'src/organization/infrastructure/entities/organization.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetOrganizationsByAdminIdQuery)
export class GetOrganizationsByAdminIdHandler implements IQueryHandler<GetOrganizationsByAdminIdQuery> {
    constructor(
        @InjectRepository(OrganizationEntity)
        private readonly organizationRepository: Repository<OrganizationEntity>,
    ) { }

    async execute(query: GetOrganizationsByAdminIdQuery): Promise<any> {
        const { adminId } = query;
        return this.organizationRepository.find({
            where: { creatorId: adminId },
        });
    }
}