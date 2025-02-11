import { IQuery } from "@nestjs/cqrs";

export class GetTasksQuery implements IQuery {
    constructor(
        public readonly userId: number,
        public readonly startDate?: string,
        public readonly endDate?: string,
        public readonly priorityId?: number,
        public readonly filterUserId?: number
    ) { }
}
