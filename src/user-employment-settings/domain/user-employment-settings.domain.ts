export class UserEmploymentSettings {
    constructor(
        public readonly id: number,
        public readonly userId: number,
        public readonly shiftId: number,
        public readonly salaryCoef: number
    ) { }

    static create(userId: number, shiftId: number, salaryCoef: number): UserEmploymentSettings {
        return new UserEmploymentSettings(null, userId, shiftId, salaryCoef);
    }
}
