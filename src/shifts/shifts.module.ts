import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftEntity } from './infrastructure/entities/shift.entity';
import { ShiftTimeEntity } from './infrastructure/entities/shift-time.entity';
import { ShiftsController } from './presentation/controllers/shifts.controller';
import { CreateShiftHandler } from './application/commands/handlers/create-shift.handler';
import { GetShiftsByOrganizationHandler } from './application/queries/handlers/get-shifts-by-organization.handler';
import { GetShiftHandler } from './application/queries/handlers/get-shift.handler';
import { GetShiftsHandler } from './application/queries/handlers/get-shifts.handler';
import { ShiftsService } from './application/services/shifts.service';
import { GetShiftsByIdHandler } from './application/queries/handlers/get-shifts-by-id.handler';
import { ShiftsCronService } from './application/services/shifts-cron.service';
import { UserTimesModule } from 'src/user-times/user-times.module';
import { AuthModule } from 'src/auth/auth.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([ShiftEntity, ShiftTimeEntity]),
        UserTimesModule,
        AuthModule,
        NotificationsModule,
        ScheduleModule.forRoot(),
    ],
    controllers: [
        ShiftsController,
    ],
    providers: [
        ShiftsCronService,

        CreateShiftHandler,

        GetShiftsByOrganizationHandler,
        GetShiftHandler,
        GetShiftsHandler,
        GetShiftsByIdHandler,

        {
            provide: 'ShiftsSharedPort',
            useClass: ShiftsService,
        },
    ],
    exports: ['ShiftsSharedPort']
})
export class ShiftsModule { }
