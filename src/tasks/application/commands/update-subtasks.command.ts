import { ICommand } from '@nestjs/cqrs';

export class UpdateSubtasksCommand implements ICommand {
    constructor(
        public readonly taskId: number,
        public readonly creatorId: number,
        public readonly subtasks: {
            id?: number;
            title: string;
        }[],
    ) { }
}