import { Property } from 'src/properties/domain/property.domain';
import { PropertyEntity } from '../entities/property.entity';

export const PropertyMapper = {
    toDomain(entity: PropertyEntity): Property {
        return new Property(
            entity.id,
            entity.title,
            entity.code,
            entity.status,
            entity.createdAt,
            entity.organizationId,
            entity.departmentId,
        );
    },

    toEntity(domain: Property): PropertyEntity {
        const entity = new PropertyEntity();
        entity.id = domain.id;
        entity.title = domain.title;
        entity.code = domain.code;
        entity.status = domain.status;
        entity.createdAt = domain.createdAt;
        entity.organizationId = domain.organizationId;
        entity.departmentId = domain.departmentId;
        return entity;
    },

    toDomainList(entities: PropertyEntity[]): Property[] {
        return entities.map(entity => this.toDomain(entity));
    },

    toEntityList(domains: Property[]): PropertyEntity[] {
        return domains.map(domain => this.toEntity(domain));
    }
};
