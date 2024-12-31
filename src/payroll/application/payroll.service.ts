import { Inject, Injectable } from "@nestjs/common";
import { PayrollUser } from "../domain/payroll-user";
import { SalaryFormula } from "../domain/value-objects/salary-formula";

@Injectable()
export class PayrollService {
    constructor(
        @Inject('IUserSharedRepository')
        private readonly userSharedRepository: any
    ) { }

    async calculatePayroll(startDate: Date, endDate: Date): Promise<PayrollUser[]> {

        // دریافت چیزای ثابت شرکت
        const baseSalaryPerHour = 45000;
        const overtimeRate = 1.5;

        // 1. دریافت لیست کاربران
        const users = [
            { id: 2, name: 'Ali' },
            { id: 3, name: 'Erfan' },
        ];

        const payrollResults: PayrollUser[] = [];

        for (const user of users) {
            // گرفتن ساعات بر حسب start و end
            const workLogs = [
                { checkIn: new Date('2024-01-01'), checkOut: new Date('2025-01-02'), isOvertime: true },
            ];

            let totalHours = 0;
            let overtimeHours = 0;

            for (const log of workLogs) {
                if (log.checkIn && log.checkOut) {
                    const checkInTime = new Date(log.checkIn).getTime();
                    const checkOutTime = new Date(log.checkOut).getTime();
                    const hoursWorked = (checkOutTime - checkInTime) / (1000 * 60 * 60); // تبدیل میلی‌ثانیه به ساعت

                    totalHours += hoursWorked;

                    if (log.isOvertime) {
                        overtimeHours += hoursWorked;
                    }
                }
            }

            const coefficient = 3;

            const calculatedSalary = SalaryFormula.calculateSalary(
                totalHours,
                overtimeHours,
                coefficient,
                baseSalaryPerHour,
                overtimeRate
            );

            payrollResults.push(
                new PayrollUser(
                    user.id,
                    user.name,
                    totalHours,
                    overtimeHours,
                    coefficient,
                    calculatedSalary,
                )
            );
        }

        return payrollResults;
    }
}