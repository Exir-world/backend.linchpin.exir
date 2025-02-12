import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsArray, IsEnum, IsNumber, IsUrl } from 'class-validator';
import { FileTypeEnum } from 'src/tasks/domain/enums/file-type.enum';

class AttachmentDto {
    @ApiPropertyOptional({ example: 1 })
    @IsOptional()
    @IsInt()
    id?: number;

    @ApiProperty({ example: FileTypeEnum.IMG })
    @IsEnum(FileTypeEnum)
    fileType: FileTypeEnum;

    @ApiProperty({ example: 'file.png' })
    @IsString()
    fileName: string;

    @ApiProperty({ example: 1024 })
    @IsNumber()
    fileSize: number;

    @ApiProperty({ example: 'http://example.com/file.png' })
    @IsUrl()
    link: string;
}

export class UpdateAttachmentsDto {
    @ApiProperty({ example: 1, description: 'Task ID for attachments' })
    @IsInt()
    taskId: number;

    @ApiProperty({
        description: 'List of attachments', type: [AttachmentDto]
    })
    @IsArray()
    attachments: AttachmentDto[];
}

