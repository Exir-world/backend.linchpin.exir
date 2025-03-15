export class PayslipDomain {
    constructor(
        public readonly id: number,
        public readonly userId: number,
        public readonly paymentDate: Date,
        public readonly date: Date,
        public readonly standardWorkDays: number,
        public readonly netWorkDays: number,
        public readonly absentMinutes: number,
        public readonly overtimeMinutes: number,
        public readonly leaveMinutes: number,
        public readonly missionMinutes: number,
        public readonly baseSalary: number,
        public readonly seniorityPay: number,
        public readonly overtimePay: number,
        public readonly insuranceFee: number,
        public readonly bonus: number,
        public readonly totalAmount: number,
        public readonly netPayable: number,
    ) { }

    /**
     * محاسبه میزان کسری و اضافه‌کاری برای اهداف گزارش‌گیری
     */
    calculateBalance(): number {
        return this.overtimeMinutes - this.absentMinutes;
    }

    /**
     * بررسی اینکه آیا فرد جریمه کسری کار دارد یا خیر
     */
    hasPenalty(): boolean {
        return this.absentMinutes > 0;
    }
}
