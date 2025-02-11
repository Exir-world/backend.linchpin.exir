import { IQuery } from "@nestjs/cqrs";

export class GetTasksByUserQuery implements IQuery {
    constructor(
        public readonly userId: number,
        public readonly startDate?: string,
        public readonly endDate?: string,
        public readonly priorityId?: number
    ) { }
}
