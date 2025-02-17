import { UserSelfImprovement } from "src/user-self-improvement/domain/user-self-improvement";
import { UserSelfImprovementEntity } from "../entities/user-self-improvement.entity";

export class UserSelfImprovementMapper {
    static toDomain(entity: UserSelfImprovementEntity): UserSelfImprovement {
        return new UserSelfImprovement(
            entity.userId,
            entity.improvementId,
            entity.userScore,
            entity.date,
            entity.description,
            entity.supervisorScore,
            entity.id,
        );
    }

    static toEntity(domain: UserSelfImprovement): UserSelfImprovementEntity {
        const entity = new UserSelfImprovementEntity();
        entity.id = domain.id;
        entity.userId = domain.userId;
        entity.improvementId = domain.improvementId;
        entity.userScore = domain.userScore;
        entity.date = domain.date;
        entity.description = domain.description;
        entity.supervisorScore = domain.supervisorScore;
        return entity;
    }

    static toDomainList(entities: UserSelfImprovementEntity[]): UserSelfImprovement[] {
        return entities.map(entity => this.toDomain(entity));
    }

    static toEntitiesList(domains: UserSelfImprovement[]): UserSelfImprovementEntity[] {
        return domains.map(domain => this.toEntity(domain));
    }
}
