import { Controller, Get, Param, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PayrollService } from '../application/services/payroll.service';
import { PayrollUser } from '../domain/payroll-user';
import { PdfService } from '../application/services/pdf.service';
import { Response } from 'express';
import { GetPayslipReportQuery } from '../application/queries/get-payslip-report.query';
import { GetPayslipByIdQuery } from '../application/queries/get-payslip-by-id.query';
import { UserAuthGuard } from 'src/auth/application/guards/user-auth.guard';

@ApiBearerAuth()
@ApiTags('Payroll')
@Controller('payroll')
export class PayrollController {
    constructor(
        private readonly payrollService: PayrollService,
        private readonly pdfService: PdfService,
    ) { }

    @UseGuards(UserAuthGuard)
    @ApiOperation({ summary: 'گزارش فیش حقوقی' })
    @Get('payslip')
    async getPayslipReport(
        @Req() req
    ): Promise<any> {
        return await this.payrollService.getPayslipReport(
            new GetPayslipReportQuery(req.user.id)
        );
    }

    @UseGuards(UserAuthGuard)
    @ApiOperation({ summary: 'جزئیات فیش حقوقی' })
    @Get('payslip/:id')
    async getPayslipById(
        @Param('id') id: number,
        @Req() req
    ): Promise<any> {
        return await this.payrollService.getPayslipById(
            new GetPayslipByIdQuery(id, req.user.id)
        );
    }

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
