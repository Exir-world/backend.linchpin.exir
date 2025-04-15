import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPropertyByIdQuery } from '../get-property-by-id.query';
import { PropertyMapper } from 'src/properties/infrastructure/mappers/property.mapper';
import { Property } from 'src/properties/domain/property.domain';
import { PropertyRepository } from '../../repositories/property.repository';

@QueryHandler(GetPropertyByIdQuery)
export class GetPropertyByIdHandler implements IQueryHandler<GetPropertyByIdQuery> {
    constructor(
        @Inject('PropertyRepository') private readonly repository: PropertyRepository,
    ) { }

    async execute(query: GetPropertyByIdQuery): Promise<Property> {
        const entity = await this.repository.findById(query.id);
        return PropertyMapper.toDomain(entity);
    }
}
