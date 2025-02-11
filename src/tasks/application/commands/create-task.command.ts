import { ICommand } from "@nestjs/cqrs";
import { FileTypeEnum } from "src/tasks/domain/enums/file-type.enum";

interface SubtaskInput {
    title: string;
}

interface AttachmentInput {
    fileName: string;
    fileSize: number;
    link: string;
    fileType: FileTypeEnum;
}

export class CreateTaskCommand implements ICommand {
    constructor(
        public readonly title: string,
        public readonly description: string,
        public readonly priorityId: number,
        public readonly date: string,
        public readonly createdBy: number,
        public readonly userId?: number,
        public readonly tagIds?: number[],
        public readonly subtasks?: SubtaskInput[],
        public readonly attachments?: AttachmentInput[]
    ) { }
}
