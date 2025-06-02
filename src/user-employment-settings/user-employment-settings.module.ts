import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEmploymentSettingsEntity } from './infrastructure/entities/user-employment-settings.entity';
import { UserEmploymentSettingsController } from './presentation/controllers/user-employment-settings.controller';
import { CreateUserEmploymentSettingsHandler } from './application/commands/handlers/create-user-employment-settings.handler';
import { GetUserEmploymentSettingsHandler } from './application/queries/handlers/get-user-employment-settings.handler';
import { UserEmploymentSettingsService } from './application/services/user-employment-settings.service';
import { GetUsersEmploymentSettingsHandler } from './application/queries/handlers/get-users-employment-settings.handler';
import { GetAllUsersEmploymentSettingsHandler } from './application/queries/handlers/get-all-users-employment-settings.handler';
import { UpdateUserEmploymentSettingsHandler } from './application/commands/handlers/update-user-employment-settings.handler';
import { RemoveDeviceUniqueCodeByUserIdHandler } from './application/commands/handlers/remove-device-unique-code.handler';
import { HandleUserDeviceCodeLoginHandler } from './application/commands/handlers/handle-user-device-code-login.handler';

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([UserEmploymentSettingsEntity]),
    ],
    controllers: [
        UserEmploymentSettingsController,
    ],
    providers: [
        CreateUserEmploymentSettingsHandler,
        UpdateUserEmploymentSettingsHandler,
        RemoveDeviceUniqueCodeByUserIdHandler,
        HandleUserDeviceCodeLoginHandler,

        GetUserEmploymentSettingsHandler,
        GetUsersEmploymentSettingsHandler,
        GetAllUsersEmploymentSettingsHandler,

        {
            provide: 'UserEmploymentSettingsSharedPort',
            useClass: UserEmploymentSettingsService,
        },
    ],
    exports: [
        'UserEmploymentSettingsSharedPort'
    ]
})
export class UserEmploymentSettingsModule { }
