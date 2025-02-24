import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetNotificationsQuery } from '../get-notifications.query';
import { INotificationRepository } from '../../ports/notification.repository';
import { Inject } from '@nestjs/common';
import { NOTIFICATION_TYPES } from '../../constants/notification-types.constant';

@QueryHandler(GetNotificationsQuery)
export class GetNotificationsHandler implements IQueryHandler<GetNotificationsQuery> {
    constructor(
        @Inject(INotificationRepository)
        private readonly notificationRepository: INotificationRepository
    ) { }

    async execute(query: GetNotificationsQuery) {
        const notifs = await this.notificationRepository.findByUserId(query.userId, query.page, query.limit);
        return {
            notifications: notifs.notifications.map(notif => ({
                ...notif,
                typeStyles: NOTIFICATION_TYPES[notif.getType()],
            })),
            total: notifs.total,
        };
    }
}
