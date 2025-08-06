import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLastLocation } from 'src/attendance/infrastructure/entities/user-last-location.entity';
import { OrganizationSettingsRepositoryPort } from 'src/organization/application/ports/organization-settings.repository';
import { Repository, LessThan } from 'typeorm';
import { GetLastAttendanceQuery } from '../queries/get-last-attendance.query';
import { OrganizationSettingsDomain } from 'src/organization/domain/organization-settings.domain';
import { SharedNotificationService } from 'src/shared-notification/shared-notification.service';
import { CheckOutCommand } from '../commands/check-out.command';
import { SharedUsersService } from 'src/shared-user/shared-user.service';

@Injectable()
export class LocationCheckCron {
    private readonly logger = new Logger(LocationCheckCron.name);

    constructor(
        @InjectRepository(UserLastLocation)
        private readonly locationRepo: Repository<UserLastLocation>,
        private readonly orgSettingsRepo: OrganizationSettingsRepositoryPort,
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly notificationService: SharedNotificationService,
        private readonly usersService: SharedUsersService,
    ) { }

    @Cron('*/1 * * * *')
    async handleCheckInactiveUsers() {
        const orgSettings = await this.orgSettingsRepo.findAll();
        const twentyMinutesAgo = new Date(Date.now() - 20 * 60 * 1000); // 20 دقیقه قبل

        const inactiveUsers = await this.locationRepo.find({
            where: {
                lastVisitedAt: LessThan(twentyMinutesAgo),
            },
        });

        const users = await this.usersService.getUsers({ userIds: inactiveUsers.map(u => u.userId) });

        this.logger.warn(`Found ${inactiveUsers.length} inactive users`);

        for (let i = 0; i < inactiveUsers.length; i++) {
            const user = inactiveUsers[i];
            this.logger.debug(`User ${user.userId} is inactive`);

            const lastAttendance = await this.queryBus.execute(new GetLastAttendanceQuery(user.userId));
            const checkedIn = lastAttendance && !lastAttendance.checkOut;
            if (checkedIn) {
                this.handleOutOfRangeWhileCheckedIn(
                    orgSettings.find(org => users.find(u => u.id == user.userId && u.organizationId == org.organizationId)),
                    user.userId,
                    users.find(u => u.id == user.userId)?.organizationId,
                )
            }
        }
    }

    async handleOutOfRangeWhileCheckedIn(orgSettings: OrganizationSettingsDomain, userId: number, organizationId: number) {
        if (orgSettings?.notifyAdminOnUserExit || true) {
            this.notificationService.sendToAdmins(
                organizationId,
                {
                    title: 'خروج از محدوده',
                    message: `ارتباط کاربر با شناسه ${userId} قطع می باشد`,
                },
                [],
            );
        }
        if (orgSettings?.registerUserExit || false) {
            await this.commandBus.execute(new CheckOutCommand(userId, 0, 0));
        }
    }
}
