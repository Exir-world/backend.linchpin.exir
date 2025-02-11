import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TaskEntity } from "src/tasks/infrastructure/entities/task.entity";
import { ApproveTaskByCreatorCommand } from "../approve-task-by-creator.command";
import { BadRequestException, NotFoundException } from "@nestjs/common";

@CommandHandler(ApproveTaskByCreatorCommand)
export class ApproveTaskByCreatorHandler implements ICommandHandler<ApproveTaskByCreatorCommand> {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
    ) { }

    async execute(command: ApproveTaskByCreatorCommand): Promise<any> {
        const { creatorId, taskId, comment } = command;

        const task = await this.taskRepository.findOne({ where: { id: taskId } });
        if (!task)
            throw new NotFoundException("Task not found");

        if (task.createdBy != creatorId)
            throw new BadRequestException("Forbidden");

        task.creatorApprove = true;
        task.creatorComment = comment;

        await this.taskRepository.save(task);

        return { message: 'تایید تسک با موفقیت انجام شد' }
    }
}
