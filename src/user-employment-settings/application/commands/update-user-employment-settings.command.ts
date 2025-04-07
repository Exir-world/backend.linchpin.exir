export class UpdateUserEmploymentSettingsCommand {
    constructor(
        public readonly userId: number,
        public readonly shiftId: number,
        public readonly salary: number,
        public readonly needLocation: boolean,
        public readonly teamId: number
    ) { }
}
