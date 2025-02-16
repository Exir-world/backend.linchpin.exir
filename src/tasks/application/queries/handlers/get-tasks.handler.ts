import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, FindManyOptions, Repository } from "typeorm";
import { TaskEntity } from "src/tasks/infrastructure/entities/task.entity";
import { Inject } from "@nestjs/common";
import { UserSharedRepository } from "src/auth/application/ports/user-shared.repository";
import { GetTasksQuery } from "../get-tasks.query";

@QueryHandler(GetTasksQuery)
export class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        @Inject('UserSharedRepository')
        private readonly userSharedPort: UserSharedRepository,
    ) { }

    async execute(query: GetTasksQuery): Promise<any> {
        const { filterUserId, startDate, endDate, priorityId, userId } = query;

        const whereConditions: FindManyOptions<TaskEntity>["where"] = [{ createdBy: userId }, { userId }];

        if (startDate && endDate) {
            whereConditions[0]["date"] = Between(new Date(startDate), new Date(endDate));
            whereConditions[1]["date"] = Between(new Date(startDate), new Date(endDate));
        } else if (startDate) {
            whereConditions[0]["date"] = Between(new Date(startDate), new Date());
            whereConditions[1]["date"] = Between(new Date(startDate), new Date());
        } else if (endDate) {
            whereConditions[0]["date"] = Between(new Date("1970-01-01"), new Date(endDate));
            whereConditions[1]["date"] = Between(new Date("1970-01-01"), new Date(endDate));
        }

        if (priorityId) {
            whereConditions[0]['priority'] = { id: priorityId };
            whereConditions[1]['priority'] = { id: priorityId };
        }

        if (filterUserId) {
            whereConditions[0]['userId'] = filterUserId;
            whereConditions[1]['userId'] = filterUserId;
        }

        const tasks = await this.taskRepository.find({
            where: whereConditions,
            relations: ['taskTags.tag'],
            order: { date: 'DESC' },
        });

        const users = await this.userSharedPort.getUserByIds(tasks.map(task => task.userId));

        return {
            myTasks: tasks.filter(task => task.userId == userId)
                .map(task => ({
                    id: task.id,
                    title: task.title,
                    date: task.date,
                    priority: task.priority,
                    done: task.creatorApprove || false,
                    taskTags: task.taskTags.map(taskTag => ({
                        id: taskTag.id,
                        title: taskTag.tag.title,
                        color: taskTag.tag.color,
                        textColor: taskTag.tag.textColor,
                        icon: taskTag.tag.icon,
                    }))
                })),
            otherTasks: tasks.filter(task => task.createdBy == userId)
                .map(task => ({
                    id: task.id,
                    title: task.title,
                    date: task.date,
                    user: users.find(us => us.id == task.userId) || { id: task.userId },
                    priority: task.priority,
                    done: task.creatorApprove || false,
                    taskTags: task.taskTags.map(taskTag => ({
                        id: taskTag.id,
                        title: taskTag.tag.title,
                        color: taskTag.tag.color,
                        textColor: taskTag.tag.textColor,
                        icon: taskTag.tag.icon,
                    }))

                })),
        }
    }
}
