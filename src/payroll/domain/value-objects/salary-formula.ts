export class SalaryFormula {
    static calculateSalary(
        totalHours: number,
        overtimeHours: number,
        coefficient: number,
        baseSalaryPerHour: number,
        overtimeRate: number
    ): number {
        const regularSalary = totalHours * baseSalaryPerHour;
        const overtimeSalary = overtimeHours * baseSalaryPerHour * overtimeRate;

        return (regularSalary + overtimeSalary) * coefficient;
    }
}
