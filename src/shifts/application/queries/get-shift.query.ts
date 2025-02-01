import { IQuery } from "@nestjs/cqrs";

export class GetShiftQuery implements IQuery {
    constructor(public readonly id: number) { }
}
