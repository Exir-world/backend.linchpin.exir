import { IQuery } from "@nestjs/cqrs";

export class GetTasksByCreatorQuery implements IQuery {
    constructor(public readonly createdBy: number) { }
}
