import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PayrollService } from '../application/payroll.service';
import { PayrollUser } from '../domain/payroll-user';

@ApiBearerAuth()
@ApiTags('Payroll')
@Controller('payroll')
export class PayrollController {
    constructor(private readonly payrollService: PayrollService) { }

    @ApiOperation({ summary: 'محاسبه حقوق کاربران در بازه زمانی' })
    @ApiResponse({ status: 200, description: 'لیست حقوق کاربران بازگردانده شد.' })
    @Get('calculate')
    async calculatePayroll(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ): Promise<PayrollUser[]> {
        const start = new Date(startDate);
        const end = new Date(endDate);

        return await this.payrollService.calculatePayroll(start, end);
    }
}
