import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserEmploymentSettingsSharedPort } from '../ports/user-employment-settings-shared.port';
import { UserEmploymentSettings } from 'src/user-employment-settings/domain/user-employment-settings.domain';
import { GetUserEmploymentSettingsQuery } from '../queries/get-user-employment-settings.query';
import { GetUsersEmploymentSettingsQuery } from '../queries/get-users-employment-settings.query';
import { GetAllUsersEmploymentSettingsQuery } from '../queries/get-all-users-employment-settings.query';
import { CreateUserEmploymentSettingsCommand } from '../commands/create-user-employment-settings.command';
import { UpdateUserEmploymentSettingsCommand } from '../commands/update-user-employment-settings.command';

@Injectable()
export class UserEmploymentSettingsService implements UserEmploymentSettingsSharedPort {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
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
        const newSettings = await this.commandBus.execute(
            new CreateUserEmploymentSettingsCommand(userId, shiftId, salary, needToLocation, teamId)
        );

        return newSettings;
    }

    async updateSettings(userId: number, settings: Partial<UserEmploymentSettings>): Promise<UserEmploymentSettings> {
        const existingSettings = await this.getSettingsByUserId(userId);

        if (!existingSettings) {
            throw new BadRequestException(`Settings for user with ID ${userId} not found.`);
        }

        const updatedSettings = {
            ...existingSettings,
            ...settings,
        };

        await this.commandBus.execute(
            new UpdateUserEmploymentSettingsCommand(
                userId,
                updatedSettings.shiftId,
                updatedSettings.salary,
                updatedSettings.needLocation,
                updatedSettings.teamId
            )
        );

        return updatedSettings;
    }
}