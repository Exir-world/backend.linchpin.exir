import { Subtask } from "src/tasks/domain/subtask.domain";
import { SubtaskEntity } from "../entities/sub-task.entity";

export class SubtaskMapper {
    static toDomain(entity: SubtaskEntity): Subtask {
        return new Subtask(entity.id, entity.title, entity.done);
    }

    static toEntity(domain: Subtask): SubtaskEntity {
        const entity = new SubtaskEntity();
        entity.id = domain.id;
        entity.title = domain.title;
        entity.done = domain.done;
        return entity;
    }
}
