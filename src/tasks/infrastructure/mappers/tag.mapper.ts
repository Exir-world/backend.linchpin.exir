import { Tag } from "src/tasks/domain/tag.domain";
import { TagEntity } from "../entities/tag.entity";

export class TagMapper {
    static toDomain(entity: TagEntity): Tag {
        return new Tag(entity.id, entity.title, entity.color, entity.textColor, entity.icon);
    }

    static toEntity(domain: Tag): TagEntity {
        const entity = new TagEntity();
        entity.id = domain.id;
        entity.title = domain.title;
        entity.color = domain.color;
        entity.textColor = domain.textColor;
        entity.icon = domain.icon;
        return entity;
    }
}
