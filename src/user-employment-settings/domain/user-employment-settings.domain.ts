export class UserEmploymentSettings {
    constructor(
        public readonly id: number,
        public readonly userId: number,
        public readonly shiftId: number,
        public readonly salaryCoef: number,
        public readonly needLocation: boolean,
    ) { }

    static create(userId: number, shiftId: number, salaryCoef: number, needLocation: boolean): UserEmploymentSettings {
        return new UserEmploymentSettings(null, userId, shiftId, salaryCoef, needLocation);
    }
}
