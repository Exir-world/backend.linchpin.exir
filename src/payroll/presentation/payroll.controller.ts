import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PayrollService } from '../application/payroll.service';
import { PayrollUser } from '../domain/payroll-user';
import { PdfService } from '../application/pdf.service';
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('Payroll')
@Controller('payroll')
export class PayrollController {
    constructor(
        private readonly payrollService: PayrollService,
        private readonly pdfService: PdfService,
    ) { }

    @ApiOperation({ summary: 'محاسبه حقوق کاربران در بازه زمانی' })
    @ApiResponse({ status: 200, description: 'لیست حقوق کاربران بازگردانده شد.' })
    @Get('calculate')
    async calculatePayroll(
        // @Param('organizationId') organizationId: number,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ): Promise<PayrollUser[]> {
        const start = new Date(startDate);
        const end = new Date(endDate);

        return await this.payrollService.calculatePayroll(start, end);
    }

    @ApiOperation({})
    @Get('fish')
    async downloadFish(
        @Res() res: Response
    ): Promise<any> {
        // const pdfBuffer = await this.pdfService.generatePayslipPdf();

        // res.set({
        //     'Content-Type': 'application/pdf',
        //     'Content-Disposition': 'attachment; filename="payslip.pdf"',
        //     'Content-Length': pdfBuffer.length,
        // });

        // res.end(pdfBuffer); // مستقیماً فایل PDF را به پاسخ ارسال کن
    }
}
