import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, FindManyOptions, Repository } from "typeorm";
import { GetTasksByCreatorQuery } from "../get-tasks-by-creator.query";
import { TaskEntity } from "src/tasks/infrastructure/entities/task.entity";
import { Inject } from "@nestjs/common";
import { UserSharedRepository } from "src/auth/application/ports/user-shared.repository";

@QueryHandler(GetTasksByCreatorQuery)
export class GetTasksByCreatorHandler implements IQueryHandler<GetTasksByCreatorQuery> {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        @Inject('UserSharedRepository')
        private readonly userSharedPort: UserSharedRepository,
    ) { }

    async execute(query: GetTasksByCreatorQuery): Promise<any[]> {
        const { createdBy, startDate, endDate, priorityId, userId } = query;

        const whereConditions: FindManyOptions<TaskEntity>["where"] = { createdBy };

        if (startDate && endDate) {
            whereConditions["date"] = Between(new Date(startDate), new Date(endDate));
        } else if (startDate) {
            whereConditions["date"] = Between(new Date(startDate), new Date());
        } else if (endDate) {
            whereConditions["date"] = Between(new Date("1970-01-01"), new Date(endDate));
        }

        if (priorityId)
            whereConditions['priority'] = { id: priorityId };

        if (userId)
            whereConditions['userId'] = userId;

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
