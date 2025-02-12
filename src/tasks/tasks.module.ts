import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentEntity } from './infrastructure/entities/attachment.entity';
import { PriorityEntity } from './infrastructure/entities/priority.entity';
import { SubtaskEntity } from './infrastructure/entities/sub-task.entity';
import { TagEntity } from './infrastructure/entities/tag.entity';
import { TaskTagEntity } from './infrastructure/entities/task-tag.entity';
import { TaskEntity } from './infrastructure/entities/task.entity';
import { TagController } from './presentation/controllers/tag.controller';
import { PriorityController } from './presentation/controllers/priority.controller';
import { CreateTagHandler } from './application/commands/handlers/create-tag.handler';
import { CreatePriorityHandler } from './application/commands/handlers/create-priority.handler';
import { GetAllTagsHandler } from './application/queries/handlers/get-all-tags.handler';
import { GetAllPrioritiesHandler } from './application/queries/handlers/get-all-priorities.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTaskHandler } from './application/commands/handlers/create-task.handler';
import { TaskController } from './presentation/controllers/task.controller';
import { GetTasksByUserHandler } from './application/queries/handlers/get-tasks-by-user.handler';
import { GetTasksByCreatorHandler } from './application/queries/handlers/get-tasks-by-creator.handler';
import { GetTaskByIdHandler } from './application/queries/handlers/get-task-by-id.handler';
import { AuthModule } from 'src/auth/auth.module';
import { GetTasksHandler } from './application/queries/handlers/get-tasks.handler';
import { ApproveTaskByCreatorHandler } from './application/commands/handlers/approve-task-by-creator.handler';
import { DoneSubTaskHandler } from './application/commands/handlers/done-sub-task.handler';
import { UpdateTaskHandler } from './application/commands/handlers/update-task.handler';
import { UpdateSubtasksHandler } from './application/commands/handlers/update-subtasks.handler';
import { UpdateAttachmentsHandler } from './application/commands/handlers/update-attachments.handler';

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([
            AttachmentEntity,
            PriorityEntity,
            SubtaskEntity,
            TagEntity,
            TaskTagEntity,
            TaskEntity,
        ]),
        AuthModule,
    ],
    controllers: [
        TagController,
        PriorityController,
        TaskController,
    ],
    providers: [
        CreateTagHandler,
        CreatePriorityHandler,
        CreateTaskHandler,
        ApproveTaskByCreatorHandler,
        DoneSubTaskHandler,
        UpdateTaskHandler,
        UpdateSubtasksHandler,
        UpdateAttachmentsHandler,

        GetAllTagsHandler,
        GetAllPrioritiesHandler,
        GetTasksByUserHandler,
        GetTasksByCreatorHandler,
        GetTaskByIdHandler,
        GetTasksHandler
    ]
})
export class TasksModule { }
