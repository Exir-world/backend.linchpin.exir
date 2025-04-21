import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAllPropertiesQuery } from '../get-all-properties.query';
import { PropertyMapper } from 'src/properties/infrastructure/mappers/property.mapper';
import { Property } from 'src/properties/domain/property.domain';
import { PropertyRepository } from '../../repositories/property.repository';

@QueryHandler(GetAllPropertiesQuery)
export class GetAllPropertiesHandler implements IQueryHandler<GetAllPropertiesQuery> {
    constructor(
        @Inject('PropertyRepository') private readonly repository: PropertyRepository,
    ) { }

    async execute(query: GetAllPropertiesQuery): Promise<Property[]> {
        const { organizationId, departmentId, isAssigned } = query;

        const entities = await this.repository.findAll(organizationId, departmentId, isAssigned);
        console.log(entities);

        return PropertyMapper.toDomainList(entities);
    }
}
