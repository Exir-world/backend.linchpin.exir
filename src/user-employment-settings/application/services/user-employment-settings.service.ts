import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserEmploymentSettingsSharedPort } from '../ports/user-employment-settings-shared.port';
import { UserEmploymentSettings } from 'src/user-employment-settings/domain/user-employment-settings.domain';
import { GetUserEmploymentSettingsQuery } from '../queries/get-user-employment-settings.query';
import { GetUsersEmploymentSettingsQuery } from '../queries/get-users-employment-settings.query';
import { GetAllUsersEmploymentSettingsQuery } from '../queries/get-all-users-employment-settings.query';
import { CreateUserEmploymentSettingsCommand } from '../commands/create-user-employment-settings.command';

@Injectable()
export class UserEmploymentSettingsService implements UserEmploymentSettingsSharedPort {
    constructor(
        private readonly queryBus: QueryBus,
    ) { }

    getSettingsByUserId(userId: number): Promise<UserEmploymentSettings> {
        return this.queryBus.execute(new GetUserEmploymentSettingsQuery(userId));
    }

    getSettingsByUsersId(userIds: number[]): Promise<UserEmploymentSettings[]> {
        return this.queryBus.execute(new GetUsersEmploymentSettingsQuery(userIds));
    }

    getSettingsForAll(): Promise<UserEmploymentSettings[]> {
        return this.queryBus.execute(new GetAllUsersEmploymentSettingsQuery());
    }

    async createSettings(
        userId: number,
        shiftId: number,
        teamId: number,
        needToLocation: boolean,
        salary: number
    ): Promise<UserEmploymentSettings> {
        const newSettings = await this.queryBus.execute(
            new CreateUserEmploymentSettingsCommand(userId, shiftId, salary, needToLocation, teamId)
        );

        return newSettings;
    }
}