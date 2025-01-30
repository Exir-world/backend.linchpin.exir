import { OrganizationCriterionEntity } from "../entities/organization-criterion.entity";
import { OrganizationCriterions } from "src/organization/domain/organization-criterions";

export class OrganizationCriterionsMapper {
    static toDomain(entity: OrganizationCriterionEntity): OrganizationCriterions {
        return new OrganizationCriterions(
            entity.id,
            entity.organizationId,
            entity.title,
            entity.description,
        );
    }

    static toEntity(domain: OrganizationCriterions): OrganizationCriterionEntity {
        const entity = new OrganizationCriterionEntity();
        entity.id = domain.getId;
        entity.organizationId = domain.getOrganizationId;
        entity.title = domain.getTitle;
        entity.description = domain.getDescription;

        return entity;
    }

    static toEntityList(domains: OrganizationCriterions[]): OrganizationCriterionEntity[] {
        return domains.map(domain => this.toEntity(domain));
    }

    static toDomainList(entities: OrganizationCriterionEntity[]): OrganizationCriterions[] {
        return entities.map(entity => this.toDomain(entity));
    }
}