import { Priority } from "src/tasks/domain/priority.domain";
import { PriorityEntity } from "../entities/priority.entity";

export class PriorityMapper {
    static toDomain(entity: PriorityEntity): Priority {
        return new Priority(entity.id, entity.title, entity.priority, entity.color);
    }

    static toEntity(domain: Priority): PriorityEntity {
        const entity = new PriorityEntity();
        entity.id = domain.id;
        entity.title = domain.title;
        entity.priority = domain.priority;
        entity.color = domain.color;
        return entity;
    }
}
