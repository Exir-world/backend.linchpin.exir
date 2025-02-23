import { NotificationTypeEnum } from 'src/notifications/domain/enums/notification-type.enum';

export class Notification {
    constructor(
        private readonly id: number,
        private readonly userId: number,
        private readonly type: NotificationTypeEnum,
        private readonly title: string,
        private readonly description: string,
        private read: boolean,
        private readonly createdAt: Date,
    ) { }

    getId(): number {
        return this.id;
    }

    getUserId(): number {
        return this.userId;
    }

    getType(): NotificationTypeEnum {
        return this.type;
    }

    getTitle(): string {
        return this.title;
    }

    getDescription(): string {
        return this.description;
    }

    isRead(): boolean {
        return this.read;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    markAsRead(): void {
        this.read = true;
    }
}
