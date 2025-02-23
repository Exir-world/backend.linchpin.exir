import { ICommand } from '@nestjs/cqrs';
import { NotificationTypeEnum } from 'src/notifications/domain/enums/notification-type.enum';

export class CreateNotificationCommand implements ICommand {
    constructor(
        public readonly userId: number,
        public readonly type: NotificationTypeEnum,
        public readonly title: string,
        public readonly description: string,
    ) { }
}
