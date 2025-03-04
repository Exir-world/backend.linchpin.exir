import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateTaskCommand } from "../create-task.command";
import { TaskEntity } from "src/tasks/infrastructure/entities/task.entity";
import { PriorityEntity } from "src/tasks/infrastructure/entities/priority.entity";
import { TagEntity } from "src/tasks/infrastructure/entities/tag.entity";
import { TaskTagEntity } from "src/tasks/infrastructure/entities/task-tag.entity";
import { SubtaskEntity } from "src/tasks/infrastructure/entities/sub-task.entity";
import { AttachmentEntity } from "src/tasks/infrastructure/entities/attachment.entity";
import { BadRequestException } from "@nestjs/common";

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        @InjectRepository(PriorityEntity)
        private readonly priorityRepository: Repository<PriorityEntity>,
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>,
        @InjectRepository(TaskTagEntity)
        private readonly taskTagRepository: Repository<TaskTagEntity>,
        @InjectRepository(SubtaskEntity)
        private readonly subtaskRepository: Repository<SubtaskEntity>,
        @InjectRepository(AttachmentEntity)
        private readonly attachmentRepository: Repository<AttachmentEntity>
    ) { }

    async execute(command: CreateTaskCommand): Promise<number> {
        const { title, description, priorityId, date, userId, tagIds, subtasks, attachments, createdBy } = command;

        // یافتن Priority
        const priority = await this.priorityRepository.findOne({ where: { id: priorityId } });
        if (!priority) {
            throw new BadRequestException("Priority not found");
        }

        // ایجاد Task
        const task = new TaskEntity();
        task.title = title;
        task.description = description;
        task.priority = priority;
        task.date = new Date(date);
        task.userId = userId;
        task.createdBy = createdBy;

        const savedTask = await this.taskRepository.save(task);

        // اضافه کردن Tag‌ها
        if (tagIds && tagIds.length > 0) {
            const tags = await this.tagRepository.find({ where: { id: In(tagIds) } });
            for (const tag of tags) {
                const taskTag = new TaskTagEntity();
                taskTag.task = savedTask;
                taskTag.tag = tag;
                await this.taskTagRepository.save(taskTag);
            }
        }

        // اضافه کردن Subtask‌ها
        if (subtasks && subtasks.length > 0) {
            for (const subtask of subtasks) {
                const subtaskEntity = new SubtaskEntity();
                subtaskEntity.title = subtask.title;
                subtaskEntity.task = savedTask;
                subtaskEntity.done = false;
                await this.subtaskRepository.save(subtaskEntity);
            }
        }

        // اضافه کردن Attachment‌ها
        if (attachments && attachments.length > 0) {
            for (const attachment of attachments) {
                const attachmentEntity = new AttachmentEntity();
                attachmentEntity.fileName = attachment.fileName;
                attachmentEntity.fileSize = attachment.fileSize;
                attachmentEntity.link = attachment.link;
                attachmentEntity.fileType = attachment.fileType;
                attachmentEntity.task = savedTask;
                await this.attachmentRepository.save(attachmentEntity);
            }
        }

        return savedTask.id;
    }
}
