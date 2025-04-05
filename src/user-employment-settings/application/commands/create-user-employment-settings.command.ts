import { ICommand } from "@nestjs/cqrs";

export class CreateUserEmploymentSettingsCommand implements ICommand {
    constructor(
        public readonly userId: number,
        public readonly shiftId: number,
        public readonly salary: number,
        public readonly needLocation: boolean,
        public readonly teamId?: number | null
    ) { }
}
