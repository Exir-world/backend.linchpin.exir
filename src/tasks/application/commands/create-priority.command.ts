import { ICommand } from "@nestjs/cqrs";

export class CreatePriorityCommand implements ICommand {
    constructor(
        public readonly title: string,
        public readonly priority: number,
        public readonly color: string
    ) { }
}
