import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetLocationByOrgIdQuery } from '../get-location-by-org-id.query';
import { LocationEntity } from 'src/organization/infrastructure/entities/location.entity';
import { LocationMapper } from 'src/organization/infrastructure/mappers/location.mapper';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetLocationByOrgIdQuery)
export class GetLocationByOrgIdHandler implements IQueryHandler<GetLocationByOrgIdQuery> {
    constructor(
        @InjectRepository(LocationEntity)
        private readonly repository: Repository<LocationEntity>) { }

    async execute(query: GetLocationByOrgIdQuery): Promise<any> {
        const organizationId = query.orgId;

        const location = await this.repository.findOne({ where: { organizationId } });
        if (!location)
            throw new NotFoundException('No location found');

        return LocationMapper.toDomain(location);
    }
}