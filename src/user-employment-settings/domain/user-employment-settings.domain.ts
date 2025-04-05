export class UserEmploymentSettings {
    constructor(
        public readonly id: number,
        public readonly userId: number,
        public readonly shiftId: number,
        public readonly salary: number,
        public readonly needLocation: boolean,
        public readonly teamId?: number | null
    ) { }

    static create(userId: number, shiftId: number, salary: number, needLocation: boolean, teamId?: number | null): UserEmploymentSettings {
        return new UserEmploymentSettings(null, userId, shiftId, salary, needLocation, teamId ?? null);
    }
}
