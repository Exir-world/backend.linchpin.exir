import { Notification } from "src/notifications/domain/notification.domain";

export const INotificationRepository = Symbol('INotificationRepository'); // استفاده از Symbol

export interface INotificationRepository {
    create(notification: Notification): Promise<void>;
    findByUserId(userId: number, page: number, limit: number): Promise<{ notifications: Notification[]; total: number }>;
    markAsRead(userId: number, ids: number[]): Promise<void>;
}
