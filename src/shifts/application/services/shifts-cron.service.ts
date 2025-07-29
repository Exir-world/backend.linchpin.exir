import { Inject, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetShiftsQuery } from '../queries/get-shifts.query';
import { UserTimesSharedService } from 'src/user-times/application/services/user-times-shared.service';
import { UserSharedRepository } from 'src/auth/application/ports/user-shared.repository';
import { INotificationRepository } from 'src/notifications/application/ports/notification.repository';
import { TIME_TOLERANCE } from 'src/common/constants/times.constant';
import { Notification } from 'src/notifications/domain/notification.domain';
import { NotificationTypeEnum } from 'src/notifications/domain/enums/notification-type.enum';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ShiftsCronService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly userTimesSharedService: UserTimesSharedService,
        @Inject('UserSharedRepository') private readonly userSharedRepository: UserSharedRepository,
        @Inject(INotificationRepository) private readonly iNotificationRepository: INotificationRepository,
    ) { }

    @Cron('0 0,10,20,30,40,50 * * * *')
    async checkShifts(): Promise<any> {
        const shifts = await this.queryBus.execute(new GetShiftsQuery());
        const users = await this.userSharedRepository.getAllUsers();
        const latestUserTimes = await this.userTimesSharedService.getLatestUserTimesForAll();

        // Users with custum time
        for (let i = 0; i < latestUserTimes.length; i++) {
            const userTime = latestUserTimes[i];
            const startTime = userTime.weeklyTimes?.[0]?.startTime;
            if (startTime) {
                const diffInMinutes = this.calculateDifferenceWithNow(startTime);
                const message = this.getNotificationMessage(diffInMinutes);

                if (message)
                    await this.iNotificationRepository.create(
                        new Notification(
                            0, userTime.userId, NotificationTypeEnum.SYSTEM, 'یادآور ورود', message, false, new Date()
                        )
                    );
            }
        }

        // Other users
        for (let i = 0; i < shifts.length; i++) {
            const { organizationId } = shifts[i];
            const { startTime } = shifts[i].shiftTimes[0];

            for (let j = 0; j < users.filter(u => u.organizationId == organizationId).length; j++) {
                const user = users[j];
                if (latestUserTimes.find(ut => ut.userId === user.id)) continue;

                if (startTime) {
                    const diffInMinutes = this.calculateDifferenceWithNow(startTime);
                    const message = this.getNotificationMessage(diffInMinutes);

                    if (message)
                        await this.iNotificationRepository.create(
                            new Notification(
                                0, user.id, NotificationTypeEnum.SYSTEM, 'یادآور ورود', message, false, new Date()
                            )
                        );
                }
            }
        }
    }

    private calculateDifferenceWithNow(startTime) {
        const [hour, minute] = startTime.split(':').map(Number);

        const now = new Date();
        const start = new Date();
        start.setHours(hour, minute, 0, 0);

        const diffInMs = start.getTime() - now.getTime();
        const diffInMinutes = diffInMs / 1000 / 60;

        return diffInMinutes;
    }

    private getNotificationMessage(diffInMinutes: number): string {
        let message;
        if (diffInMinutes <= 2 && diffInMinutes >= -2) {
            message = `ورود تو بزن`;
        } else if (diffInMinutes >= 0 && diffInMinutes <= TIME_TOLERANCE + 1) {
            message = `باید ${TIME_TOLERANCE} دقیقه دیگ ورود بزنی`;
        } else if (diffInMinutes <= 0 && diffInMinutes >= -(TIME_TOLERANCE + 1)) {
            message = `${TIME_TOLERANCE} دقیقه از ورود رد شده`;
        }

        return message;
    }
}