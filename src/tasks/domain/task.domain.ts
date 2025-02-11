import { Attachment } from "./attachment.domain";
import { Priority } from "./priority.domain";
import { Subtask } from "./subtask.domain";
import { Tag } from "./tag.domain";

export class Task {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public priority: Priority,
        public date: Date,
        public userId: number,
        public createdBy: number,
        public creatorApprove: boolean,
        public creatorComment?: string,
        public estimatedDuration?: number,
        public createdAt?: Date,
        public tags?: Tag[],
        public subtasks?: Subtask[],
        public attachments?: Attachment[]
    ) { }
}
