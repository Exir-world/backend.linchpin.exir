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
