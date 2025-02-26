import { ICommand } from "@nestjs/cqrs";

export class CreateUserEmploymentSettingsCommand implements ICommand {
    constructor(
        public readonly userId: number,
        public readonly shiftId: number,
        public readonly salaryCoef: number,
        public readonly needLocation: boolean,
    ) { }
}
