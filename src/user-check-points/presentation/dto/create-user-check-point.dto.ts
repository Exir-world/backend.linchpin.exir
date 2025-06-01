import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserCheckPointAttachmentInputDto {
    @ApiProperty()
    @IsString()
    filename: string;

    @ApiProperty()
    @IsString()
    fileType: string;

    @ApiProperty()
    @IsString()
    fileUrl: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;
}

export class CreateUserCheckPointDto {
    @ApiProperty()
    @IsNumber()
    userId: number;

    @ApiProperty()
    @IsNumber()
    checkPointId: number;

    @ApiProperty()
    @IsNumber()
    lat: number;

    @ApiProperty()
    @IsNumber()
    lng: number;

    @ApiPropertyOptional({ default: false })
    @IsOptional()
    @IsBoolean()
    report?: boolean = false;

    @ApiPropertyOptional({ type: [UserCheckPointAttachmentInputDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UserCheckPointAttachmentInputDto)
    attachments?: UserCheckPointAttachmentInputDto[];
}