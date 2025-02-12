import { ICommand } from '@nestjs/cqrs';
import { FileTypeEnum } from 'src/tasks/domain/enums/file-type.enum';

export class UpdateAttachmentsCommand implements ICommand {
    constructor(
        public readonly taskId: number,
        public readonly creatorId: number,
        public readonly attachments: {
            id?: number;
            fileType: FileTypeEnum;
            fileName: string;
            fileSize: number;
            link: string;
        }[],
    ) { }
}