import { ICommand } from "@nestjs/cqrs";

export class CreateTagCommand implements ICommand {
    constructor(
        public readonly title: string,
        public readonly color: string
    ) { }
}
