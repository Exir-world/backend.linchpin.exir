import { ICommand } from "@nestjs/cqrs";

export class DoneSubTaskCommand implements ICommand {
    constructor(
        public readonly userId: number,
        public readonly subtaskId: number,
        public readonly done: boolean,
    ) { }
}
