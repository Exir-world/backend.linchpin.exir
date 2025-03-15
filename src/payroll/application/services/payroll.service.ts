import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PayrollUser } from "../../domain/payroll-user";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CalculatePayrollCommand } from "../commands/calculate-payroll.command";
import { GetPayslipReportQuery } from "../queries/get-payslip-report.query";
import { GetPayslipByIdQuery } from "../queries/get-payslip-by-id.query";

@Injectable()
export class PayrollService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    async calculatePayroll(startDate: Date, endDate: Date): Promise<PayrollUser[]> {
        return this.commandBus.execute(new CalculatePayrollCommand(1, startDate, endDate));
    }

    async getPayslipReport(query: GetPayslipReportQuery): Promise<any> {
        return this.queryBus.execute(query);
    }

    async getPayslipById(query: GetPayslipByIdQuery): Promise<any> {
        const payslip = await this.queryBus.execute(query);
        if (!payslip)
            throw new NotFoundException();

        if (query.userId != payslip.userId)
            throw new ForbiddenException();

        return payslip;
    }
}