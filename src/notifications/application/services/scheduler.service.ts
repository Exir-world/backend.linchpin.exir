import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SendNotificationUseCase } from '../use-cases/send-notification.use-case';

@Injectable()
export class NotificationSchedulerService {
    constructor(private sendNotification: SendNotificationUseCase) { }

    @Cron('0 8 * * *') // هر روز ساعت ۸ صبح
    async handleReminder() {
        const tokens = ['user_fcm_token_1', 'user_fcm_token_2']; // از دیتابیس واقعی بگیر
        for (const token of tokens) {
            await this.sendNotification.execute(token, 'یادآوری ورود', 'لطفاً ورود خود را ثبت کنید.');
        }
    }
}
