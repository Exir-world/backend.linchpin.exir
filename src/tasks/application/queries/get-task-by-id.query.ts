import { IQuery } from "@nestjs/cqrs";

export class GetTaskByIdQuery implements IQuery {
    constructor(
        public readonly taskId: number,
        public readonly userId: number,
    ) { }
}
