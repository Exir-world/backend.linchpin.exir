import { IQuery } from "@nestjs/cqrs";

export class GetTasksByCreatorQuery implements IQuery {
    constructor(
        public readonly createdBy: number,
        public readonly startDate?: string,
        public readonly endDate?: string,
        public readonly priorityId?: number,
        public readonly userId?: number,
    ) { }
}
