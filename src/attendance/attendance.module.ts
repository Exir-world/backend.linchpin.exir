import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceEntity } from './infrastructure/entities/attendance.entity';
import { WorkReportEntity } from './infrastructure/entities/work-report.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { AttendanceController } from './presentation/controllers/attendance.controller';
import { AttendanceService } from './application/services/attendance.service';
import { AttendanceRepositoryImpl } from './infrastructure/repositories/attendance.repository';
import { AttendanceRepository } from './application/ports/attendance.repository';
import { WorkReportRepositoryImpl } from './infrastructure/repositories/work-report.repository';
import { WorkReportRepository } from './application/ports/work-report.repository';
import { ApproveWorkReportHandler } from './application/commands/handlers/approve-work-report.handler';
import { CheckInHandler } from './application/commands/handlers/check-in.handler';
import { CheckOutHandler } from './application/commands/handlers/check-out.handler';
import { SubmitWorkReportHandler } from './application/commands/handlers/submit-work-report.handler';
import { GetLastAttendanceHandler } from './application/queries/handlers/get-last-attendance.handler';
import { StopEntity } from './infrastructure/entities/stop.entity';
import { StopRepositoryImpl } from './infrastructure/repositories/stop.repository';
import { StopRepository } from './application/ports/stop.repository';
import { CreateStopHandler } from './application/commands/handlers/create-stop.handler';
import { EndStopHandler } from './application/commands/handlers/end-stop.handler';
import { AuthModule } from 'src/auth/auth.module';
import { GetDailyAttendanceStatusHandler } from './application/queries/handlers/get-daily-attendance-status.handler';
import { GetMonthlyReportHandler } from './application/queries/handlers/get-monthly-report.handler';
import { AttendanceSharedRepositoryImpl } from './infrastructure/repositories/attendance-shared.repository';
import { LeaveModule } from 'src/leave/leave.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CheckOutCheckingHandler } from './application/commands/handlers/check-out-checking.handler';
import { OrganizationModule } from 'src/organization/organization.module';
import { ShiftsModule } from 'src/shifts/shifts.module';
import { UserEmploymentSettingsModule } from 'src/user-employment-settings/user-employment-settings.module';
import { UpdateAttendanceAdminHandler } from './application/commands/handlers/update-attendance-admin.handler';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AttendanceEntity,
            WorkReportEntity,
            StopEntity
        ]),
        CqrsModule,
        AuthModule,
        LeaveModule,
        OrganizationModule,
        ShiftsModule,
        UserEmploymentSettingsModule,
        ScheduleModule.forRoot()
    ],
    controllers: [
        AttendanceController,
    ],
    providers: [
        // Services
        AttendanceService,

        // Repositories
        AttendanceRepositoryImpl,
        {
            provide: AttendanceRepository,
            useClass: AttendanceRepositoryImpl
        },
        WorkReportRepositoryImpl,
        {
            provide: WorkReportRepository,
            useClass: WorkReportRepositoryImpl
        },
        StopRepositoryImpl,
        {
            provide: StopRepository,
            useClass: StopRepositoryImpl
        },
        {
            provide: 'IUserSharedRepository',
            useExisting: 'UserSharedRepository', // اشاره به پیاده‌سازی موجود در AuthModule
        },
        {
            provide: 'ILeaveSharedRepository',
            useExisting: 'LeaveSharedRepository',
        },
        AttendanceSharedRepositoryImpl,
        {
            provide: 'AttendanceSharedRepository',
            useClass: AttendanceSharedRepositoryImpl
        },

        // Command Handlers
        ApproveWorkReportHandler,
        CheckInHandler,
        CheckOutHandler,
        SubmitWorkReportHandler,
        CreateStopHandler,
        EndStopHandler,
        CheckOutCheckingHandler,
        UpdateAttendanceAdminHandler,

        // Query Handlers
        GetLastAttendanceHandler,
        GetDailyAttendanceStatusHandler,
        GetMonthlyReportHandler,
    ],
    exports: ['AttendanceSharedRepository']
})
export class AttendanceModule { }
