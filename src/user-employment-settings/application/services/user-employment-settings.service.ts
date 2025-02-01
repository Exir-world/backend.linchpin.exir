import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserEmploymentSettingsSharedPort } from '../ports/user-employment-settings-shared.port';
import { UserEmploymentSettings } from 'src/user-employment-settings/domain/user-employment-settings.domain';
import { GetUserEmploymentSettingsQuery } from '../queries/get-user-employment-settings.query';

@Injectable()
export class UserEmploymentSettingsService implements UserEmploymentSettingsSharedPort {
    constructor(
        private readonly queryBus: QueryBus,
    ) { }

    getSettingsByUserId(userId: number): Promise<UserEmploymentSettings> {
        return this.queryBus.execute(new GetUserEmploymentSettingsQuery(userId));
    }
}