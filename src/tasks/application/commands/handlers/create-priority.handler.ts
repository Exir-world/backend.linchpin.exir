import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePriorityCommand } from "../create-priority.command";
import { PriorityEntity } from "src/tasks/infrastructure/entities/priority.entity";

@CommandHandler(CreatePriorityCommand)
export class CreatePriorityHandler implements ICommandHandler<CreatePriorityCommand> {
    constructor(
        @InjectRepository(PriorityEntity)
        private readonly priorityRepository: Repository<PriorityEntity>
    ) { }

    async execute(command: CreatePriorityCommand): Promise<PriorityEntity> {
        const { title, priority, color } = command;
        const priorityEntity = new PriorityEntity();
        priorityEntity.title = title;
        priorityEntity.priority = priority;
        priorityEntity.color = color;

        return await this.priorityRepository.save(priorityEntity);
    }
}
