import { Location } from "src/organization/domain/location";
import { LocationEntity } from "../entities/location.entity";

export class LocationMapper {
    static toDomain(entity: LocationEntity): Location {
        if (!entity) return undefined;

        return new Location(
            entity.organizationId,
            entity.lat,
            entity.lng,
            entity.radius,
            entity.id,
            entity.createdAt,
            entity.updatedAt
        );
    }

    static toEntity(domain: Location): LocationEntity {
        const entity = new LocationEntity();
        entity.id = domain.id!;
        entity.organizationId = domain.organizationId;
        entity.lat = domain.lat;
        entity.lng = domain.lng;
        entity.radius = domain.radius;
        entity.createdAt = domain.createdAt!;
        entity.updatedAt = domain.updatedAt!;
        return entity;
    }
}
