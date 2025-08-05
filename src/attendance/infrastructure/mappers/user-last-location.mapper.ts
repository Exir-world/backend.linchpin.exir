import { UserLastLocationDomain } from "src/attendance/domain/user-last-location.domain";
import { UserLastLocation } from "../entities/user-last-location.entity";

export class UserLastLocationMapper {
    static toDomain(entity: UserLastLocation): UserLastLocationDomain {
        return new UserLastLocationDomain(
            entity.userId,
            entity.lat,
            entity.lng,
            entity.lastVisitedAt,
        );
    }

    static toPersistence(domain: UserLastLocationDomain): Partial<UserLastLocation> {
        const entity = new UserLastLocation();
        entity.userId = domain.userId;
        entity.lat = domain.lat;
        entity.lng = domain.lng;
        return entity;
    }
}
