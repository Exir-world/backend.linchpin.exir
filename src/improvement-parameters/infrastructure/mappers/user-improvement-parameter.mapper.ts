import { UserImprovementParameter } from "src/improvement-parameters/domain/user-improvement-parameter.domain";
import { UserImprovementParameterEntity } from "../entities/user-improvement-parameter.entitiy";
import { ImprovementParameterMapper } from "./improvement-parameter.mapper";

export class UserImprovementParameterMapper {
    static toDomain(entity: UserImprovementParameterEntity): UserImprovementParameter {
        return new UserImprovementParameter(
            entity.id,
            entity.userId,
            entity.improvementParameter,
            entity.userScore,
            entity.supervisorScore,
            entity.date,
            entity.description ?? null,
        );
    }

    static toEntity(domain: UserImprovementParameter): UserImprovementParameterEntity {
        const entity = new UserImprovementParameterEntity();
        entity.id = domain.id;
        entity.userId = domain.userId;
        entity.improvementParameter = ImprovementParameterMapper.toEntity(domain.improvementParameter);
        entity.userScore = domain.userScore;
        entity.supervisorScore = domain.supervisorScore;
        entity.date = domain.date;
        entity.description = domain.description;
        return entity;
    }

    static list(entities: UserImprovementParameterEntity[]): UserImprovementParameter[] {
        return entities.map((e) => this.toDomain(e));
    }
}
