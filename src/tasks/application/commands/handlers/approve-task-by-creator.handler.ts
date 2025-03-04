import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TaskEntity } from "src/tasks/infrastructure/entities/task.entity";
import { ApproveTaskByCreatorCommand } from "../approve-task-by-creator.command";
import { BadRequestException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";

@CommandHandler(ApproveTaskByCreatorCommand)
export class ApproveTaskByCreatorHandler implements ICommandHandler<ApproveTaskByCreatorCommand> {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        private readonly i18n: I18nService,
    ) { }

    async execute(command: ApproveTaskByCreatorCommand): Promise<any> {
        const { creatorId, taskId, comment } = command;

        const task = await this.taskRepository.findOne({ where: { id: taskId } });
        if (!task)
            throw new NotFoundException(this.i18n.t('task.task.404'));

        if (task.createdBy != creatorId)
            throw new ForbiddenException();

        task.creatorApprove = true;
        task.creatorComment = comment;

        await this.taskRepository.save(task);

        return { message: this.i18n.t('task.task.confirmSuccess') }
    }
}
