import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNotificationCommand } from '../create-notification.command';
import { INotificationRepository } from '../../ports/notification.repository';
import { Notification } from 'src/notifications/domain/notification.domain';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateNotificationCommand)
export class CreateNotificationHandler implements ICommandHandler<CreateNotificationCommand> {
    constructor(@Inject(INotificationRepository) private readonly notificationRepository: INotificationRepository) { }

    async execute(command: CreateNotificationCommand): Promise<any> {
        const notification = new Notification(
            null, // ID auto-generated
            command.userId,
            command.type,
            command.title,
            command.description,
            false, // unread by default
            new Date()
        );

        await this.notificationRepository.create(notification);

        return { message: 'Notification created successfully' };
    }
}
