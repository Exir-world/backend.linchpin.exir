import { Task } from "src/tasks/domain/task.domain";
import { TaskEntity } from "../entities/task.entity";
import { PriorityMapper } from "./priority.mapper";
import { TagMapper } from "./tag.mapper";
import { SubtaskMapper } from "./subtask.mapper";
import { AttachmentMapper } from "./attachment.mapper";

export class TaskMapper {
    static toDomain(entity: TaskEntity): Task {
        return new Task(
            entity.id,
            entity.title,
            entity.description,
            PriorityMapper.toDomain(entity.priority),
            entity.date,
            entity.userId,
            entity.createdBy,
            entity.creatorApprove,
            entity.creatorComment,
            entity.estimatedDuration,
            entity.createdAt,
            entity.taskTags ? entity.taskTags.map((taskTag) => TagMapper.toDomain(taskTag.tag)) : [],
            entity.subTasks ? entity.subTasks.map((subtask) => SubtaskMapper.toDomain(subtask)) : [],
            entity.attachments ? entity.attachments.map((attachment) => AttachmentMapper.toDomain(attachment)) : []
        );
    }

    static toEntity(domain: Task): TaskEntity {
        const entity = new TaskEntity();
        entity.id = domain.id;
        entity.title = domain.title;
        entity.description = domain.description;
        entity.priority = PriorityMapper.toEntity(domain.priority);
        entity.estimatedDuration = domain.estimatedDuration;
        entity.date = domain.date;
        entity.userId = domain.userId;
        entity.createdBy = domain.createdBy;
        entity.createdAt = domain.createdAt;
        entity.creatorApprove = domain.creatorApprove;
        entity.creatorComment = domain.creatorComment;

        // تنظیم لیست `taskTags` به صورت `TaskTagEntity`
        // if (domain.tags) {
        //     entity.taskTags = domain.tags.map((tag) => {
        //         const taskTag = new TaskTagEntity();
        //         taskTag.task = entity;
        //         taskTag.tag = TagMapper.toEntity(tag);
        //         return taskTag;
        //     });
        // }

        if (domain.subtasks) {
            entity.subTasks = domain.subtasks.map((subtask) => {
                const subtaskEntity = SubtaskMapper.toEntity(subtask);
                subtaskEntity.task = entity;
                return subtaskEntity;
            });
        }

        if (domain.attachments) {
            entity.attachments = domain.attachments.map((attachment) => {
                const attachmentEntity = AttachmentMapper.toEntity(attachment);
                attachmentEntity.task = entity;
                return attachmentEntity;
            });
        }

        return entity;
    }
}
