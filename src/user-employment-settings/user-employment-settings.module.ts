import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEmploymentSettingsEntity } from './infrastructure/entities/user-employment-settings.entity';
import { UserEmploymentSettingsController } from './presentation/controllers/user-employment-settings.controller';
import { CreateUserEmploymentSettingsHandler } from './application/commands/handlers/create-user-employment-settings.handler';
import { GetUserEmploymentSettingsHandler } from './application/queries/handlers/get-user-employment-settings.handler';

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
    ],
})
export class UserEmploymentSettingsModule { }
