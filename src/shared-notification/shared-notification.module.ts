import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { SharedNotificationService } from './shared-notification.service';
import { FirebaseNotificationService } from 'src/notifications/infrastructure/services/firebase-notification.service';

@Module({
    imports: [AuthModule],
    providers: [
        SharedNotificationService,
        FirebaseNotificationService,
    ],
    exports: [SharedNotificationService],
})
export class SharedNotificationModule { }
