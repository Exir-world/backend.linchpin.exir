import { IQuery } from "@nestjs/cqrs";

export class GetShiftsByIdQuery implements IQuery {
    constructor(
        public ids: number[],
    ) { }
}
