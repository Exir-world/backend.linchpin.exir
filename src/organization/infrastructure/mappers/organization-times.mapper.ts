import { OrganizationTimes } from "src/organization/domain/organization-times";
import { OrganizationTimesEntity } from "../entities/organization-times.entity";
import { DateUtil } from "src/common/utils/date.util";

export class OrganizationTimesMapper {
    static toDomain(entity: OrganizationTimesEntity, setZone: boolean = false): OrganizationTimes {
        return new OrganizationTimes(
            entity.id,
            entity.organizationId,
            setZone ? DateUtil.parseTime(entity.startTime) : entity.startTime,
            setZone ? DateUtil.parseTime(entity.endTime) : entity.endTime,
            entity.isWorkTime,
            entity.description,
        );
    }

    static toEntity(domain: OrganizationTimes): OrganizationTimesEntity {
        const entity = new OrganizationTimesEntity();
        entity.id = domain.getId;
        entity.organizationId = domain.getOrganizationId;
        entity.isWorkTime = domain.getIsWorkTime;
        entity.startTime = domain.getStartTime;
        entity.endTime = domain.getEndTime;
        entity.description = domain.getDescription;

        return entity;
    }

    static toEntityList(domains: OrganizationTimes[]): OrganizationTimesEntity[] {
        return domains.map(domain => this.toEntity(domain));
    }

    static toDomainList(entities: OrganizationTimesEntity[], setZone: boolean = false): OrganizationTimes[] {
        return entities.map(entity => this.toDomain(entity, setZone));
    }
}