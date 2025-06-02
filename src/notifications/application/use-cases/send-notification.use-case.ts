import { Injectable } from '@nestjs/common';
import { FirebaseNotificationService } from 'src/notifications/infrastructure/services/firebase-notification.service';

@Injectable()
export class SendNotificationUseCase {
    constructor(
        private readonly firebaseService: FirebaseNotificationService,
    ) { }

    async execute(userFcmToken: string, title: string, message: string) {
        await this.firebaseService.sendNotification(userFcmToken, title, message);
    }
}
