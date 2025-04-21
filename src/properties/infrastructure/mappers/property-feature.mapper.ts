// src/property-feature/mappers/property-feature.mapper.ts
import { PropertyFeature } from 'src/properties/domain/property-feature.domain';
import { PropertyFeatureEntity } from '../entities/property-feature.entity';
import { PropertyCategoryFeatureMapper } from './property-category-feature.mapper';
import { PropertyMapper } from './property.mapper';

export class PropertyFeatureMapper {
    static toDomain(entity: PropertyFeatureEntity): PropertyFeature {
        return new PropertyFeature(
            entity.id,
            entity.value,
            entity.property ? PropertyMapper.toDomain(entity.property) : null,
            entity.feature ? PropertyCategoryFeatureMapper.toDomain(entity.feature) : null,
        );
    }

    static toEntity(domain: PropertyFeature): PropertyFeatureEntity {
        const entity = new PropertyFeatureEntity();
        entity.id = domain.id;
        entity.value = domain.value;
        entity.property = PropertyMapper.toEntity(domain.property);
        entity.feature = PropertyCategoryFeatureMapper.toEntity(domain.feature);
        return entity;
    }

    static toDomainList(entities: PropertyFeatureEntity[]): PropertyFeature[] {
        return entities.map((entity) => this.toDomain(entity));
    }

    static toEntitiesList(domains: PropertyFeature[]): PropertyFeatureEntity[] {
        return domains.map((domain) => this.toEntity(domain));
    }
}
