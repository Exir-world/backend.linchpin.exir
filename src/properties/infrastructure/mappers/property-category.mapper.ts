// src/property-category/mappers/property-category.mapper.ts
import { PropertyCategory } from 'src/properties/domain/property-category.domain';
import { PropertyCategoryEntity } from '../entities/property-category.entity';
import { PropertyCategoryFeatureMapper } from './property-category-feature.mapper';

export class PropertyCategoryMapper {
    static toDomain(entity: PropertyCategoryEntity): PropertyCategory {
        return new PropertyCategory(entity.id, entity.title, PropertyCategoryFeatureMapper.toDomainList(entity.features));
    }

    static toEntity(domain: PropertyCategory): PropertyCategoryEntity {
        const entity = new PropertyCategoryEntity();
        entity.id = domain.id;
        entity.title = domain.title;
        return entity;
    }

    static toDomainList(entities: PropertyCategoryEntity[]): PropertyCategory[] {
        return entities.map((entity) => this.toDomain(entity));
    }

    static toEntitiesList(domains: PropertyCategory[]): PropertyCategoryEntity[] {
        return domains.map((domain) => this.toEntity(domain));
    }
}
