import { Injectable } from '@nestjs/common';
// import admin from './firebase-admin-init'; // همان فایل مرحله قبل

@Injectable()
export class FirebaseNotificationService {
    async sendNotification(token: string, title: string, body: string) {
        if (!token) return;

        const message = {
            token,
            notification: {
                title,
                body,
            },
        };

        // await admin.messaging().send(message);
    }
}
