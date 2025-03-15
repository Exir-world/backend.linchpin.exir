import { Module } from '@nestjs/common';
import { PayrollService } from './application/services/payroll.service';
import { PayrollController } from './presentation/payroll.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserEmploymentSettingsModule } from 'src/user-employment-settings/user-employment-settings.module';
import { AttendanceModule } from 'src/attendance/attendance.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CalculatePayrollHandler } from './application/commands/handlers/calculate-payroll.handler';
import { PdfService } from './application/services/pdf.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payslip } from './infrastructure/entities/payslip.entity';
import { GetPayslipByIdHandler } from './application/queries/handlers/get-payslip-by-id.handler';
import { GetPayslipReportHandler } from './application/queries/handlers/get-payslip-report.handler';

@Module({
    imports: [
        CqrsModule,
        AuthModule,
        UserEmploymentSettingsModule,
        AttendanceModule,
        TypeOrmModule.forFeature([Payslip]),

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
        GetPayslipByIdHandler,
        GetPayslipReportHandler,
    ],
})
export class PayrollModule { }
