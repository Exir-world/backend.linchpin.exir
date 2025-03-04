import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BadRequestException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { DoneSubTaskCommand } from "../done-sub-task.command";
import { SubtaskEntity } from "src/tasks/infrastructure/entities/sub-task.entity";
import { I18nService } from "nestjs-i18n";

@CommandHandler(DoneSubTaskCommand)
export class DoneSubTaskHandler implements ICommandHandler<DoneSubTaskCommand> {
    constructor(
        @InjectRepository(SubtaskEntity)
        private readonly subtaskRepository: Repository<SubtaskEntity>,
        private readonly i18n: I18nService,
    ) { }

    async execute(command: DoneSubTaskCommand): Promise<any> {
        const { userId, subtaskId, done } = command;

        const subtask = await this.subtaskRepository.findOne({ where: { id: subtaskId }, relations: ['task'] });
        if (!subtask)
            throw new NotFoundException(this.i18n.t('task.task.404'));

        if (subtask.task.userId != userId)
            throw new ForbiddenException();

        subtask.done = done;

        await this.subtaskRepository.save(subtask);

        return { taskId: subtask.task.id, message: this.i18n.t('task.subtask.doneSuccess') }
    }
}
