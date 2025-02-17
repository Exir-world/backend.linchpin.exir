import { SelfImprovementItem } from "src/organization/domain/self-improvement-item";
import { SelfImprovementItemEntity } from "../entities/self-improvement-item.entity";

export class SelfImprovementItemMapper {

    // تبدیل از Entity به Domain
    static toDomain(entity: SelfImprovementItemEntity): SelfImprovementItem {
        return new SelfImprovementItem(
            entity.id,
            entity.title,
            entity.score,
            entity.image,
            entity.color,
        );
    }

    // تبدیل از Domain به Entity
    static toEntity(domain: SelfImprovementItem): SelfImprovementItemEntity {
        const entity = new SelfImprovementItemEntity();
        entity.id = domain.id;
        entity.title = domain.title;
        entity.score = domain.score;
        entity.image = domain.image;
        entity.color = domain.color;
        return entity;
    }

    static toEntityList(domains: SelfImprovementItem[]): SelfImprovementItemEntity[] {
        return domains.map(domain => this.toEntity(domain));
    }

    static toDomainList(entities: SelfImprovementItemEntity[]): SelfImprovementItem[] {
        return entities.map(entity => this.toDomain(entity));
    }
}
