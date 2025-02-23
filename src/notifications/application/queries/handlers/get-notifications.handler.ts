import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetNotificationsQuery } from '../get-notifications.query';
import { INotificationRepository } from '../../ports/notification.repository';
import { Inject } from '@nestjs/common';

@QueryHandler(GetNotificationsQuery)
export class GetNotificationsHandler implements IQueryHandler<GetNotificationsQuery> {
    constructor(
        @Inject(INotificationRepository)
        private readonly notificationRepository: INotificationRepository
    ) { }

    async execute(query: GetNotificationsQuery) {
        return this.notificationRepository.findByUserId(query.userId, query.page, query.limit);
    }
}
