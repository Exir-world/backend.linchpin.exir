import { Module } from '@nestjs/common';
import { PayrollService } from './application/payroll.service';
import { PayrollController } from './presentation/payroll.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserEmploymentSettingsModule } from 'src/user-employment-settings/user-employment-settings.module';
import { AttendanceModule } from 'src/attendance/attendance.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CalculatePayrollHandler } from './application/commands/handlers/calculate-payroll.handler';
import { PdfService } from './application/pdf.service';

@Module({
    imports: [
        CqrsModule,
        AuthModule,
        UserEmploymentSettingsModule,
        AttendanceModule,
    ],
    controllers: [PayrollController],
    providers: [
        PdfService,
        PayrollService,
        CalculatePayrollHandler,
        {
            provide: 'IUserSharedRepository',
            useExisting: 'UserSharedRepository', // اشاره به پیاده‌سازی موجود در AuthModule
        },
    ],
})
export class PayrollModule { }
