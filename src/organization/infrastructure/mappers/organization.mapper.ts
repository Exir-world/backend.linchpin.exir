import { Organization } from "src/organization/domain/organization";
import { OrganizationEntity } from "../entities/organization.entity";

export class OrganizationMapper {
    static toDomain(entity: OrganizationEntity): Organization {
        return new Organization(entity.id, entity.name, entity.address, entity.description);
    }

    static toEntity(domain: Organization): OrganizationEntity {
        const entity = new OrganizationEntity();
        entity.id = domain.getId;
        entity.name = domain.getName;
        entity.address = domain.getAddress;
        entity.description = domain.getDescription;

        return entity;
    }

    static toEntityList(domains: Organization[]): OrganizationEntity[] {
        return domains.map(domain => this.toEntity(domain));
    }

    static toDomainList(entities: OrganizationEntity[]): Organization[] {
        return entities.map(entity => this.toDomain(entity));
    }
}