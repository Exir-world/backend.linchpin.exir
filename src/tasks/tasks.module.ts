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

        GetAllTagsHandler,
        GetAllPrioritiesHandler,
        GetTasksByUserHandler,
        GetTasksByCreatorHandler,
        GetTaskByIdHandler
    ]
})
export class TasksModule { }
