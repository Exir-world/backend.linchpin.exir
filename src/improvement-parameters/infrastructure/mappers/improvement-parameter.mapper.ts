import { ImprovementParameter } from "src/improvement-parameters/domain/improvement-parameter.domain";
import { ImprovementParameterEntity } from "../entities/improvement-parameter.entitiy";

export class ImprovementParameterMapper {
    static toDomain(entity: ImprovementParameterEntity): ImprovementParameter {
        return new ImprovementParameter(
            entity.id,
            entity.title,
            entity.type,
            entity.image || null,
            entity.color || null,
            entity.score,
            entity.parent?.id,
        );
    }

    static toEntity(domain: ImprovementParameter): ImprovementParameterEntity {
        const entity = new ImprovementParameterEntity();
        entity.id = domain.id;
        entity.title = domain.title;
        entity.type = domain.type;
        entity.image = domain.image;
        entity.color = domain.color;
        entity.score = domain.score;

        if (domain.parentId) {
            entity.parent = { id: domain.parentId } as ImprovementParameterEntity;
        }

        return entity;
    }

    static toDomainList(entities: ImprovementParameterEntity[]): ImprovementParameter[] {
        return entities.map(this.toDomain);
    }

    static toEntityList(domains: ImprovementParameter[]): ImprovementParameterEntity[] {
        return domains.map(this.toEntity);
    }
}
