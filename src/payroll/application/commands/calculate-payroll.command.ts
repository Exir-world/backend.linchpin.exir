import { ICommand } from "@nestjs/cqrs";

export class CalculatePayrollCommand implements ICommand {
    constructor(
        public readonly organizationId: number,
        public readonly startTime: Date,
        public readonly endTime: Date,
    ) { }
}
