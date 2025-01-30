import { IQuery } from "@nestjs/cqrs";

export class GetTasksByUserQuery implements IQuery {
    constructor(public readonly userId: number) { }
}
