import { Property } from 'src/properties/domain/property.domain';
import { PropertyEntity } from '../entities/property.entity';
import { PropertyCategoryMapper } from './property-category.mapper';
import { PropertyFeatureMapper } from './property-feature.mapper';

export const PropertyMapper = {
    toDomain(entity: PropertyEntity): Property {
        return new Property(
            entity.id,
            entity.code,
            entity.category ? PropertyCategoryMapper.toDomain(entity.category) : null,
            entity.status,
            entity.createdAt,
            entity.organizationId,
            entity.departmentId,
            entity.brand,
            entity.model,
            entity.description,
            entity.imageUrl,
            entity.userProperties,
            entity.features ? PropertyFeatureMapper.toDomainList(entity.features) : [],
        );
    },

    toEntity(domain: Property): PropertyEntity {
        const entity = new PropertyEntity();
        entity.id = domain.id;
        entity.category = PropertyCategoryMapper.toEntity(domain.category);
        entity.code = domain.code;
        entity.status = domain.status;
        entity.createdAt = domain.createdAt;
        entity.organizationId = domain.organizationId;
        entity.departmentId = domain.departmentId;
        entity.imageUrl = domain.imageUrl;
        entity.brand = domain.brand;
        entity.model = domain.model;
        entity.description = domain.description;
        return entity;
    },

    toDomainList(entities: PropertyEntity[]): Property[] {
        return entities.map(entity => this.toDomain(entity));
    },

    toEntityList(domains: Property[]): PropertyEntity[] {
        return domains.map(domain => this.toEntity(domain));
    }
};
