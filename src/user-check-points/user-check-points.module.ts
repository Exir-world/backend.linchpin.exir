import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCheckPointEntity } from './infrastructure/entities/user-check-point.entity';
import { UserCheckPointAttachmentEntity } from './infrastructure/entities/user-check-point-attachment.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { UserCheckPointController } from './presentation/controllers/user-check-point.controller';
import { CreateUserCheckPointHandler } from './application/commands/handlers/create-user-check-point.handler';
import { GetAllCheckPointsForAdminHandler } from './application/queries/handlers/get-all-check-points-for-admin.handler';
import { GetUserCheckPointsHandler } from './application/queries/handlers/get-user-check-points.handler';
import { UserCheckpointAssignEntity } from './infrastructure/entities/user-check-point-assign.entity';
import { CheckPointsModule } from 'src/check-points/check-points.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserCheckPointEntity,
            UserCheckPointAttachmentEntity,
            UserCheckpointAssignEntity,
        ]),
        CqrsModule,
        CheckPointsModule, // Assuming CheckPointModule is defined elsewhere
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
