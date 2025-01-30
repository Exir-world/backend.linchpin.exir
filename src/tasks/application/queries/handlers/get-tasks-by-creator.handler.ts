import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetTasksByCreatorQuery } from "../get-tasks-by-creator.query";
import { TaskEntity } from "src/tasks/infrastructure/entities/task.entity";

@QueryHandler(GetTasksByCreatorQuery)
export class GetTasksByCreatorHandler implements IQueryHandler<GetTasksByCreatorQuery> {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>
    ) { }

    async execute(query: GetTasksByCreatorQuery): Promise<TaskEntity[]> {
        return await this.taskRepository.find({ where: { createdBy: query.createdBy } });
    }
}
