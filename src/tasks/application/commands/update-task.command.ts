import { ICommand } from '@nestjs/cqrs';

export class UpdateTaskCommand implements ICommand {
    constructor(
        public readonly taskId: number,
        public readonly creatorId: number,
        public readonly title?: string,
        public readonly description?: string,
        public readonly priorityId?: number,
        public readonly date?: Date,
        public readonly userId?: number,
        public readonly taskTags?: number[],
    ) { }
}