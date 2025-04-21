import { PropertyCategoryFeature } from 'src/properties/domain/property-category-feature.domain';
import { PropertyCategoryFeatureEntity } from '../entities/property-category-feature.entity';
import { PropertyCategoryMapper } from './property-category.mapper';

export class PropertyCategoryFeatureMapper {
    static toDomain(entity: PropertyCategoryFeatureEntity): PropertyCategoryFeature {
        return new PropertyCategoryFeature(
            entity.id,
            entity.title,
            entity.category ? PropertyCategoryMapper.toDomain(entity.category) : null,
        );
    }

    static toEntity(domain: PropertyCategoryFeature): PropertyCategoryFeatureEntity {
        const entity = new PropertyCategoryFeatureEntity();
        entity.id = domain.id;
        entity.title = domain.title;
        entity.category = PropertyCategoryMapper.toEntity(domain.category);
        return entity;
    }

    static toDomainList(entities: PropertyCategoryFeatureEntity[]): PropertyCategoryFeature[] {
        return entities?.map((entity) => this.toDomain(entity));
    }

    static toEntitiesList(domains: PropertyCategoryFeature[]): PropertyCategoryFeatureEntity[] {
        return domains?.map((domain) => this.toEntity(domain));
    }
}
