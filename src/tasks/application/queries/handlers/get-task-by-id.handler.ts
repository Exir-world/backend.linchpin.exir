import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetTaskByIdQuery } from "../get-task-by-id.query";
import { TaskEntity } from "src/tasks/infrastructure/entities/task.entity";

@QueryHandler(GetTaskByIdQuery)
export class GetTaskByIdHandler implements IQueryHandler<GetTaskByIdQuery> {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>
    ) { }

    async execute(query: GetTaskByIdQuery): Promise<TaskEntity | null> {
        return await this.taskRepository.findOne({
            where: { id: query.taskId },
            relations: ["priority", "taskTags", "taskTags.tag", "subTasks", "attachments"]
        });
    }
}
