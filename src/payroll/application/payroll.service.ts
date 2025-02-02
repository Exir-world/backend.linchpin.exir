import { Inject, Injectable } from "@nestjs/common";
import { PayrollUser } from "../domain/payroll-user";
import { CommandBus } from "@nestjs/cqrs";
import { CalculatePayrollCommand } from "./commands/calculate-payroll.command";

@Injectable()
export class PayrollService {
    constructor(
        private readonly commandBus: CommandBus,
    ) { }

    async calculatePayroll(startDate: Date, endDate: Date): Promise<PayrollUser[]> {
        return this.commandBus.execute(new CalculatePayrollCommand(1, startDate, endDate));
    }
}