import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetTaskByIdQuery } from "../get-task-by-id.query";
import { TaskEntity } from "src/tasks/infrastructure/entities/task.entity";
import { Inject, NotFoundException } from "@nestjs/common";
import { UserSharedRepository } from "src/auth/application/ports/user-shared.repository";
import { I18nService } from "nestjs-i18n";

@QueryHandler(GetTaskByIdQuery)
export class GetTaskByIdHandler implements IQueryHandler<GetTaskByIdQuery> {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        @Inject('UserSharedRepository')
        private readonly userSharedPort: UserSharedRepository,
        private readonly i18n: I18nService,
    ) { }

    async execute(query: GetTaskByIdQuery): Promise<any> {
        const task = await this.taskRepository.findOne({
            where: [
                { id: query.taskId, userId: query.userId },
                { id: query.taskId, createdBy: query.userId },
            ],
            relations: ["priority", "taskTags", "taskTags.tag", "subTasks", "attachments"]
        });

        if (!task)
            throw new NotFoundException(this.i18n.t('task.task.404'));

        const user = await this.userSharedPort.getUserById(task.userId);

        return {
            ...task,
            user: user || { id: task.userId },
            taskTags: task.taskTags.map(taskTag => ({
                id: taskTag.id,
                title: taskTag.tag.title,
                color: taskTag.tag.color,
                textColor: taskTag.tag.textColor,
                icon: taskTag.tag.icon,
            }))
        }
    }
}
