import { Team } from "src/organization/domain/team.domain";
import { TeamEntity } from "../entities/team.entity";

export class TeamMapper {
    static toDomain(entity: TeamEntity): Team {
        return new Team(
            entity.id,
            entity.organizationId,
            entity.title,
            entity.color,
            entity.description,
        );
    }

    static toEntity(domain: Team): TeamEntity {
        const entity = new TeamEntity();
        entity.id = domain.getId;
        entity.organizationId = domain.getOrganizationId;
        entity.title = domain.getTitle;
        entity.color = domain.getColor;
        entity.description = domain.getDescription;

        return entity;
    }

    static toEntityList(domains: Team[]): TeamEntity[] {
        return domains.map(domain => this.toEntity(domain));
    }

    static toDomainList(entities: TeamEntity[]): Team[] {
        return entities.map(entity => this.toDomain(entity));
    }
}