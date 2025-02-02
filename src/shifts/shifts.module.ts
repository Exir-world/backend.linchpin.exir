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

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([ShiftEntity, ShiftTimeEntity]),
    ],
    controllers: [
        ShiftsController,
    ],
    providers: [
        CreateShiftHandler,

        GetShiftsByOrganizationHandler,
        GetShiftHandler,
        GetShiftsHandler,

        {
            provide: 'ShiftsSharedPort',
            useClass: ShiftsService,
        },
    ],
    exports: ['ShiftsSharedPort']
})
export class ShiftsModule { }
