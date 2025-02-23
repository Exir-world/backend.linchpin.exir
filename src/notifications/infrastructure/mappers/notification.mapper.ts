import { Notification } from "src/notifications/domain/notification.domain";
import { NotificationEntity } from "../entities/notification.entity";

export class NotificationMapper {
    static toDomain(entity: NotificationEntity): Notification {
        return new Notification(
            entity.id,
            entity.userId,
            entity.type,
            entity.title,
            entity.description,
            entity.read,
            entity.createdAt
        );
    }

    static toEntity(domain: Notification): NotificationEntity {
        const entity = new NotificationEntity();
        entity.id = domain.getId();
        entity.userId = domain.getUserId();
        entity.type = domain.getType();
        entity.title = domain.getTitle();
        entity.description = domain.getDescription();
        entity.read = domain.isRead();
        entity.createdAt = domain.getCreatedAt();
        return entity;
    }

    static toDomainList(entities: NotificationEntity[]): Notification[] {
        return entities.map(entity => this.toDomain(entity));
    }

    static toEntityList(domains: Notification[]): NotificationEntity[] {
        return domains.map(domain => this.toEntity(domain));
    }
}
