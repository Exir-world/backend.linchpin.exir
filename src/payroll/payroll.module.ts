import { Module } from '@nestjs/common';
import { PayrollService } from './application/payroll.service';
import { PayrollController } from './presentation/payroll.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        AuthModule
    ],
    controllers: [PayrollController],
    providers: [
        PayrollService,
        {
            provide: 'IUserSharedRepository',
            useExisting: 'UserSharedRepository', // اشاره به پیاده‌سازی موجود در AuthModule
        },
    ],
})
export class PayrollModule { }
