import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MarkAsReadCommand } from '../mark-as-read.command';
import { INotificationRepository } from '../../ports/notification.repository';
import { Inject } from '@nestjs/common';

@CommandHandler(MarkAsReadCommand)
export class MarkAsReadHandler implements ICommandHandler<MarkAsReadCommand> {
    constructor(
        @Inject(INotificationRepository)
        private readonly notificationRepository: INotificationRepository
    ) { }

    async execute(command: MarkAsReadCommand): Promise<any> {
        await this.notificationRepository.markAsRead(command.userId, command.ids);
        return { message: 'Notifications marked as read successfully' };
    }
}
