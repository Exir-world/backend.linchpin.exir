import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { INotificationRepository } from '../../application/ports/notification.repository';
import { NotificationEntity } from '../entities/notification.entity';
import { Notification } from 'src/notifications/domain/notification.domain';

@Injectable()
export class NotificationRepositoryAdapter implements INotificationRepository {
    constructor(
        @InjectRepository(NotificationEntity)
        private readonly repository: Repository<NotificationEntity>,
    ) { }

    async create(notification: Notification): Promise<void> {
        const entity = this.repository.create({
            userId: notification.getUserId(),
            type: notification.getType(),
            title: notification.getTitle(),
            description: notification.getDescription(),
            read: notification.isRead(),
            createdAt: notification.getCreatedAt(),
        });

        await this.repository.save(entity);
    }

    async findByUserId(userId: number/*, page: number, limit: number*/): Promise<{ notifications: Notification[]; total: number }> {
        const [entities, total] = await this.repository.findAndCount({
            where: { userId },
            order: { createdAt: 'DESC' },
            // take: limit,
            // skip: (page - 1) * limit,
        });

        const notifications = entities.map((entity) =>
            new Notification(entity.id, entity.userId, entity.type, entity.title, entity.description, entity.read, entity.createdAt)
        );

        return { notifications, total };
    }

    async markAsRead(userId: number, ids: number[]): Promise<void> {
        await this.repository.update({ userId, id: In(ids) }, { read: true });
    }
}
