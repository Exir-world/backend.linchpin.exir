import { UserProperty } from 'src/properties/domain/user-property.domain';
import { UserPropertyEntity } from '../entities/user-property.entity';

export const UserPropertyMapper = {
    toDomain(entity: UserPropertyEntity): UserProperty {
        return new UserProperty(
            entity.id,
            entity.userId,
            entity.propertyId,
            entity.property,
            entity.deliveredAt,
        );
    },

    toEntity(domain: UserProperty): UserPropertyEntity {
        const entity = new UserPropertyEntity();
        entity.id = domain.id;
        entity.userId = domain.userId;
        entity.propertyId = domain.propertyId;
        entity.deliveredAt = domain.deliveredAt;
        return entity;
    },

    toDomainList(entities: UserPropertyEntity[]): UserProperty[] {
        return entities.map(entity => this.toDomain(entity));
    },

    toEntityList(domains: UserProperty[]): UserPropertyEntity[] {
        return domains.map(domain => this.toEntity(domain));
    }
};
