import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { DoneSubTaskCommand } from "../done-sub-task.command";
import { SubtaskEntity } from "src/tasks/infrastructure/entities/sub-task.entity";

@CommandHandler(DoneSubTaskCommand)
export class DoneSubTaskHandler implements ICommandHandler<DoneSubTaskCommand> {
    constructor(
        @InjectRepository(SubtaskEntity)
        private readonly subtaskRepository: Repository<SubtaskEntity>,
    ) { }

    async execute(command: DoneSubTaskCommand): Promise<any> {
        const { userId, subtaskId, done } = command;

        const subtask = await this.subtaskRepository.findOne({ where: { id: subtaskId }, relations: ['task'] });
        if (!subtask)
            throw new NotFoundException("Task not found");

        if (subtask.task.userId != userId)
            throw new BadRequestException("Forbidden");

        subtask.done = done;

        await this.subtaskRepository.save(subtask);

        return { message: 'عملیات با موفقیت انجام شد' }
    }
}
