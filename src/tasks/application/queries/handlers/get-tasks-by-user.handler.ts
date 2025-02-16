import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, FindManyOptions, Repository } from "typeorm";
import { GetTasksByUserQuery } from "../get-tasks-by-user.query";
import { TaskEntity } from "src/tasks/infrastructure/entities/task.entity";
import { Inject } from "@nestjs/common";
import { UserSharedRepository } from "src/auth/application/ports/user-shared.repository";

@QueryHandler(GetTasksByUserQuery)
export class GetTasksByUserHandler implements IQueryHandler<GetTasksByUserQuery> {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        @Inject('UserSharedRepository')
        private readonly userSharedPort: UserSharedRepository,
    ) { }

    async execute(query: GetTasksByUserQuery): Promise<any[]> {
        const { userId, startDate, endDate, priorityId } = query;

        const whereConditions: FindManyOptions<TaskEntity>["where"] = { userId };

        if (startDate && endDate) {
            whereConditions["date"] = Between(new Date(startDate), new Date(endDate));
        } else if (startDate) {
            whereConditions["date"] = Between(new Date(startDate), new Date());
        } else if (endDate) {
            whereConditions["date"] = Between(new Date("1970-01-01"), new Date(endDate));
        }

        if (priorityId)
            whereConditions['priority'] = { id: priorityId };

        const tasks = await this.taskRepository.find({
            where: whereConditions,
            relations: ['taskTags.tag'],
            order: { date: 'DESC' },
        });

        const users = await this.userSharedPort.getUserByIds(tasks.map(task => task.userId));

        return tasks.map(task => ({
            id: task.id,
            title: task.title,
            date: task.date,
            user: users.find(us => us.id == task.userId) || { id: task.userId },
            createdBy: task.createdBy,
            priority: task.priority,
            taskTags: task.taskTags.map(taskTag => ({
                id: taskTag.id,
                title: taskTag.tag.title,
                color: taskTag.tag.color,
                textColor: taskTag.tag.textColor,
                icon: taskTag.tag.icon,
            }))
        }));
    }
}
