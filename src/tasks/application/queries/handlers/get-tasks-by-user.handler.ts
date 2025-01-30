import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetTasksByUserQuery } from "../get-tasks-by-user.query";
import { TaskEntity } from "src/tasks/infrastructure/entities/task.entity";

@QueryHandler(GetTasksByUserQuery)
export class GetTasksByUserHandler implements IQueryHandler<GetTasksByUserQuery> {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>
    ) { }

    async execute(query: GetTasksByUserQuery): Promise<TaskEntity[]> {
        return await this.taskRepository.find({ where: { userId: query.userId } });
    }
}
