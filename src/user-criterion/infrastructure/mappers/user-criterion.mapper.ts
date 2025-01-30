import { UserCriterion } from "src/user-criterion/domain/user-criterion";
import { UserCriterionEntity } from "../entities/user-criterion.entity";

export class UserCriterionMapper {
    static toDomain(entity: UserCriterionEntity): UserCriterion {
        return new UserCriterion(
            entity.userId,
            entity.criterionId,
            entity.userScore,
            entity.date,
            entity.supervisorScore,
            entity.id,
        );
    }

    static toEntity(domain: UserCriterion): UserCriterionEntity {
        const entity = new UserCriterionEntity();
        entity.id = domain.id;
        entity.userId = domain.userId;
        entity.criterionId = domain.criterionId;
        entity.userScore = domain.userScore;
        entity.date = domain.date;
        entity.supervisorScore = domain.supervisorScore;
        return entity;
    }

    static toDomainList(entities: UserCriterionEntity[]): UserCriterion[] {
        return entities.map(entity => this.toDomain(entity));
    }

    static toEntitiesList(domains: UserCriterion[]): UserCriterionEntity[] {
        return domains.map(domain => this.toEntity(domain));
    }
}
