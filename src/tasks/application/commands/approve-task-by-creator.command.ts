import { ICommand } from "@nestjs/cqrs";

export class ApproveTaskByCreatorCommand implements ICommand {
    constructor(
        public readonly creatorId: number,
        public readonly taskId: number,
        public readonly comment?: string,
    ) { }
}
