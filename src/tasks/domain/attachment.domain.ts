import { FileTypeEnum } from "./enums/file-type.enum";

export class Attachment {
    constructor(
        public id: number,
        public fileType: FileTypeEnum,
        public fileName: string,
        public createdAt: Date,
        public fileSize: number,
        public link: string
    ) { }
}
