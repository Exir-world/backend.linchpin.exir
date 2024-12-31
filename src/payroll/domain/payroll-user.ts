export class PayrollUser {
    constructor(
        public readonly userId: number,
        public readonly name: string,
        public readonly totalHours: number,
        public readonly overtimeHours: number,
        public readonly coefficient: number,
        public readonly calculatedSalary: number,
    ) { }
}
