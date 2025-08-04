import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckPointEntity } from './infrastructure/entities/check-point.entity';
import { CheckPointItemEntity } from './infrastructure/entities/check-point-item.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCheckPointHandler } from './application/commands/handlers/create-check-point.handler';
import { GetCheckPointsHandler } from './application/queries/handlers/get-check-points.handler';
import { UpdateCheckPointHandler } from './application/commands/handlers/update-check-point.handler';
import { DeleteCheckPointHandler } from './application/commands/handlers/delete-check-point.handler';
import { UpdateCheckPointItemsHandler } from './application/commands/handlers/update-check-point-items.handler';
import { GetCheckPointByIdHandler } from './application/queries/handlers/get-check-point-by-id.handler';
import { CheckPointController } from './presentation/controllers/check-point.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CheckPointEntity,
            CheckPointItemEntity,
        ]),
        CqrsModule,
    ],
    providers: [
        // Handlers for commands and queries would be imported here
        CreateCheckPointHandler,
        UpdateCheckPointHandler,
        DeleteCheckPointHandler,
        UpdateCheckPointItemsHandler,

        GetCheckPointsHandler,
        GetCheckPointByIdHandler,
    ],
    controllers: [
        CheckPointController,
    ],
    exports: [
        TypeOrmModule
    ]

})
export class CheckPointsModule { }
