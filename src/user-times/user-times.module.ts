import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTimesEntity } from './infrastructure/entities/user-times.entity';
import { WeeklyTimesEntity } from './infrastructure/entities/weekly-times.entity';
import { UserTimesController } from './presentation/controllers/user-times.controller';
import { CreateUserTimesHandler } from './application/commands/handlers/create-user-times.handler';
import { GetLatestUserTimesHandler } from './application/queries/handlers/get-latest-user-times.handler';


@Module({
    imports: [
        TypeOrmModule.forFeature([UserTimesEntity, WeeklyTimesEntity]),
        CqrsModule,
    ],
    controllers: [UserTimesController],
    providers: [
        // Command Handlers
        CreateUserTimesHandler,

        // Query Handlers
        GetLatestUserTimesHandler,
    ],
    exports: [],
})
export class UserTimesModule { }
