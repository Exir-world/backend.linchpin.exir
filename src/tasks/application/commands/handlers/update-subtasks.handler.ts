import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSubtasksCommand } from '../update-subtasks.command';
import { SubtaskEntity } from 'src/tasks/infrastructure/entities/sub-task.entity';
import { TaskEntity } from 'src/tasks/infrastructure/entities/task.entity';
import { I18nService } from 'nestjs-i18n';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateSubtasksCommand)
export class UpdateSubtasksHandler implements ICommandHandler<UpdateSubtasksCommand> {
    constructor(
        @InjectRepository(SubtaskEntity)
        private readonly subtaskRepository: Repository<SubtaskEntity>,
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        private readonly i18n: I18nService,
    ) { }

    async execute(command: UpdateSubtasksCommand): Promise<void> {
        const { taskId, creatorId, subtasks } = command;

        const task = await this.taskRepository.findOne({ where: { id: taskId, createdBy: creatorId } });
        if (!task) {
            throw new NotFoundException(this.i18n.t('task.task.404'));
        }

        const existingSubtasks = await this.subtaskRepository.find({ where: { task: { id: taskId } } });
        const existingSubtaskIds = existingSubtasks.map(s => s.id);

        // حذف ساب‌تسک‌هایی که در لیست جدید نیستند
        const subtasksToRemove = existingSubtasks.filter(s => !subtasks.some(st => st.id === s.id));
        await this.subtaskRepository.remove(subtasksToRemove);

        // اضافه یا بروزرسانی ساب‌تسک‌ها
        for (const subtask of subtasks) {
            if (subtask.id && existingSubtaskIds.includes(subtask.id)) {
                await this.subtaskRepository.update(subtask.id, {
                    title: subtask.title,
                });
            } else {
                const newSubtask = this.subtaskRepository.create({
                    task,
                    title: subtask.title,
                });
                await this.subtaskRepository.save(newSubtask);
            }
        }
    }
}
