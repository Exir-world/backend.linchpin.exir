import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTimesEntity } from './infrastructure/entities/user-times.entity';
import { WeeklyTimesEntity } from './infrastructure/entities/weekly-times.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserTimesEntity,
            WeeklyTimesEntity,
        ]),
        CqrsModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class UserTimesModule { }
