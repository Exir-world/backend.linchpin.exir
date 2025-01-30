import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, ValidateNested, IsEnum } from "class-validator";
import { Type } from "class-transformer";
import { FileTypeEnum } from "src/tasks/domain/enums/file-type.enum";

class SubtaskDto {
    @ApiProperty({ example: "Review the document", description: "The title of the subtask" })
    @IsString()
    @IsNotEmpty()
    title: string;
}

class AttachmentDto {
    @ApiProperty({ example: "document.pdf", description: "File name" })
    @IsString()
    @IsNotEmpty()
    fileName: string;

    @ApiProperty({ example: 1048576, description: "File size in bytes" })
    @IsNumber()
    @IsNotEmpty()
    fileSize: number;

    @ApiProperty({ example: "https://example.com/document.pdf", description: "File link" })
    @IsString()
    @IsNotEmpty()
    link: string;

    @ApiProperty({ example: FileTypeEnum.PDF, enum: FileTypeEnum, description: "Type of file" })
    @IsEnum(FileTypeEnum)
    @IsNotEmpty()
    fileType: FileTypeEnum;
}

export class CreateTaskDto {
    @ApiProperty({ example: "Complete project report", description: "The title of the task" })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: "Complete and submit the project report", description: "The description of the task" })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 1, description: "Priority ID" })
    @IsNumber()
    @IsNotEmpty()
    priorityId: number;

    @ApiProperty({ example: "2025-02-10", description: "Due date of the task" })
    @IsString()
    @IsNotEmpty()
    date: string;

    @ApiProperty({ example: 3, description: "User ID assigned to this task", required: false })
    @IsNumber()
    @IsOptional()
    userId?: number;

    @ApiProperty({ example: [1, 2], description: "List of tag IDs", required: false })
    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    tagIds?: number[];

    @ApiProperty({ type: [SubtaskDto], description: "List of subtasks", required: false })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SubtaskDto)
    @IsOptional()
    subtasks?: SubtaskDto[];

    @ApiProperty({ type: [AttachmentDto], description: "List of attachments", required: false })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AttachmentDto)
    @IsOptional()
    attachments?: AttachmentDto[];
}
