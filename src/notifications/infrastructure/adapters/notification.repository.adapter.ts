import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { INotificationRepository } from '../../application/ports/notification.repository';
import { NotificationEntity } from '../entities/notification.entity';
import { Notification } from 'src/notifications/domain/notification.domain';
import { FirebaseNotificationService } from '../services/firebase-notification.service';
import { UserSessionSharedRepository } from 'src/auth/application/ports/user-session-shared.repository';

@Injectable()
export class NotificationRepositoryAdapter implements INotificationRepository {
    constructor(
        @Inject('UserSessionSharedRepository')
        private readonly sessionRepository: UserSessionSharedRepository,
        @InjectRepository(NotificationEntity)
        private readonly repository: Repository<NotificationEntity>,
        private readonly firebaseService: FirebaseNotificationService,
    ) { }

    async create(notification: Notification): Promise<void> {
        const userId = notification.getUserId();

        const entity = this.repository.create({
            userId,
            type: notification.getType(),
            title: notification.getTitle(),
            description: notification.getDescription(),
            read: notification.isRead(),
            createdAt: notification.getCreatedAt(),
        });

        await this.repository.save(entity);

        const firebaseTokens = await this.sessionRepository.getFirebaseTokens([userId]);
        firebaseTokens.forEach(({ firebaseToken }) => {
            if (firebaseToken) {
                this.firebaseService.sendNotification(firebaseToken, notification.getTitle(), notification.getDescription());
            }
        });
    }

    async findByUserId(userId: number, page: number, limit: number, unreadOnly: boolean): Promise<{ notifications: Notification[]; total: number }> {
        const where: any = { userId };
        if (unreadOnly) {
            where.read = false;
        }

        const [entities, total] = await this.repository.findAndCount({
            where,
            order: { createdAt: 'DESC' },
            take: limit,
            skip: (page - 1) * limit,
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
