import { Inject, Injectable } from '@nestjs/common';
import { SendNotificationToUsersDto } from './dto/send-notification-to-users.dto';
import { UserSessionSharedRepository } from 'src/auth/application/ports/user-session-shared.repository';
import { FirebaseNotificationService } from 'src/notifications/infrastructure/services/firebase-notification.service';
import { UserSharedRepository } from 'src/auth/application/ports/user-shared.repository';
import { SendNotificationToAdminsDto } from './dto/send-notification-to-admins.dto';
import { Permission } from 'src/auth/domain/enums/permission.enum';

@Injectable()
export class SharedNotificationService {
    constructor(
        @Inject('UserSharedRepository')
        private readonly userSharedPort: UserSharedRepository,
        @Inject('UserSessionSharedRepository')
        private readonly userSessionSharedPort: UserSessionSharedRepository,
        private readonly firebaseService: FirebaseNotificationService,
    ) { }

    async sendToUsers(dto: SendNotificationToUsersDto): Promise<void> {
        const tokens = await this.userSessionSharedPort.getFirebaseTokens(dto.userIds, false);

        for (const { firebaseToken } of tokens) {
            await this.firebaseService.sendNotification(firebaseToken, dto.title, dto.message);
        }
    }

    async sendToAdmins(organizationId: number, dto: SendNotificationToAdminsDto, permissions: Permission[] = []): Promise<void> {
        const admins = await this.userSharedPort.getAdmins(organizationId, permissions);
        const tokens = await this.userSessionSharedPort.getFirebaseTokens(admins, true);
        console.log(tokens);

        for (const { firebaseToken } of tokens) {
            await this.firebaseService.sendNotification(firebaseToken, dto.title, dto.message);
        }
    }
}
