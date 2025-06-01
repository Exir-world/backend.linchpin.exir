import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCheckPointEntity } from './infrastructure/entities/user-check-point.entity';
import { UserCheckPointAttachmentEntity } from './infrastructure/entities/user-check-point-attachment.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { UserCheckPointController } from './presentation/controllers/user-check-point.controller';
import { CreateUserCheckPointHandler } from './application/commands/handlers/create-user-check-point.handler';
import { GetAllCheckPointsForAdminHandler } from './application/queries/handlers/get-all-check-points-for-admin.handler';
import { GetUserCheckPointsHandler } from './application/queries/handlers/get-user-check-points.handler';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserCheckPointEntity,
            UserCheckPointAttachmentEntity,
        ]),
        CqrsModule,
    ],
    controllers: [
        UserCheckPointController,
    ],
    providers: [
        CreateUserCheckPointHandler,
        GetAllCheckPointsForAdminHandler,
        GetUserCheckPointsHandler,
    ],
})
export class UserCheckPointsModule { }
