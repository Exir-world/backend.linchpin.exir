import { SelfImprovement } from "src/organization/domain/self-improvement";
import { SelfImprovementEntity } from "../entities/self-improvement.entity";
import { SelfImprovementItem } from "src/organization/domain/self-improvement-item";
import { SelfImprovementItemMapper } from "./self-improvement-item.mapper";

export class SelfImprovementMapper {
    static toDomain(entity: SelfImprovementEntity): SelfImprovement {
        return new SelfImprovement(
            entity.id,
            entity.organizationId,
            entity.title,
            entity.isDefault,
            entity.description,
            SelfImprovementItemMapper.toDomainList(entity.items || []),
        );
    }

    static toEntity(domain: SelfImprovement): SelfImprovementEntity {
        const entity = new SelfImprovementEntity();
        entity.id = domain.getId;
        entity.organizationId = domain.getOrganizationId;
        entity.title = domain.getTitle;
        entity.isDefault = domain.getIsDefault;
        entity.description = domain.getDescription;
        entity.items = SelfImprovementItemMapper.toEntityList(domain.getItems);

        return entity;
    }

    static toEntityList(domains: SelfImprovement[]): SelfImprovementEntity[] {
        return domains.map(domain => this.toEntity(domain));
    }

    static toDomainList(entities: SelfImprovementEntity[]): SelfImprovement[] {
        return entities.map(entity => this.toDomain(entity));
    }
}