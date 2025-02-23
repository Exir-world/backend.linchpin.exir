import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './infrastructure/entities/notification.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { NotificationController } from './presentation/controllers/notification.controller';
import { NotificationRepositoryAdapter } from './infrastructure/adapters/notification.repository.adapter';
import { CreateNotificationHandler } from './application/commands/handlers/create-notification.handler';
import { GetNotificationsHandler } from './application/queries/handlers/get-notifications.handler';
import { MarkAsReadHandler } from './application/commands/handlers/mark-as-read.handler';
import { INotificationRepository } from './application/ports/notification.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([NotificationEntity]),
        CqrsModule,
    ],
    controllers: [NotificationController],
    providers: [
        {
            provide: INotificationRepository,
            useClass: NotificationRepositoryAdapter,
        },
        CreateNotificationHandler,
        GetNotificationsHandler,
        MarkAsReadHandler,
    ],
})
export class NotificationsModule { }
