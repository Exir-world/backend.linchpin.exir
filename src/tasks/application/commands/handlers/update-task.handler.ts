import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTaskCommand } from '../update-task.command';
import { TaskEntity } from 'src/tasks/infrastructure/entities/task.entity';
import { TaskTagEntity } from 'src/tasks/infrastructure/entities/task-tag.entity';
import { TagEntity } from 'src/tasks/infrastructure/entities/tag.entity';
import { PriorityEntity } from 'src/tasks/infrastructure/entities/priority.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        @InjectRepository(TaskTagEntity)
        private readonly taskTagRepository: Repository<TaskTagEntity>,
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>,
        @InjectRepository(PriorityEntity)
        private readonly priorityRepository: Repository<PriorityEntity>,
        private readonly i18n: I18nService,
    ) { }

    async execute(command: UpdateTaskCommand): Promise<void> {
        const { taskId, creatorId, title, description, priorityId, date, userId, taskTags } = command;

        const task = await this.taskRepository.findOne({ where: { id: taskId, createdBy: creatorId } });
        if (!task) {
            throw new NotFoundException(this.i18n.t('task.task.404'));
        }

        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (date !== undefined) task.date = date;
        if (userId !== undefined) task.userId = userId;

        if (priorityId !== undefined) {
            const priority = await this.priorityRepository.findOne({ where: { id: priorityId } });
            if (!priority) throw new BadRequestException('Priority not found');
            task.priority = priority;
        }

        if ((taskTags || []).length) {
            const existingTags = await this.taskTagRepository.find({ where: { task: { id: taskId } }, relations: ['tag'] });
            const existingTagIds = existingTags.map(t => t.tag.id);

            const tagsToAdd = taskTags.filter(id => !existingTagIds.includes(id));
            const tagsToRemove = existingTags.filter(t => !taskTags.includes(t.tag.id));

            for (const tagEntity of tagsToRemove) {
                await this.taskTagRepository.remove(tagEntity);
            }

            for (const tagId of tagsToAdd) {
                const tag = await this.tagRepository.findOne({ where: { id: tagId } });
                if (tag) {

                    const newTaskTag = new TaskTagEntity();
                    newTaskTag.task = task;
                    newTaskTag.tag = tag;
                    await this.taskTagRepository.save(newTaskTag);

                }
            }
        }

        await this.taskRepository.save(task);
    }
}
