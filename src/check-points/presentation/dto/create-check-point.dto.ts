import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CheckPointItemInput {
    @ApiProperty({ example: 35.6892, description: 'Latitude of the checkpoint' })
    @IsNumber()
    lat: number;

    @ApiProperty({ example: 51.3890, description: 'Longitude of the checkpoint' })
    @IsNumber()
    lng: number;

    @ApiPropertyOptional({ example: 50, description: 'Radius of the checkpoint' })
    @IsOptional()
    @IsNumber()
    radius?: number = 50;

    @ApiPropertyOptional({ example: false, description: 'Whether a report is needed' })
    @IsOptional()
    @IsBoolean()
    needReport?: boolean = false;
}

export class CreateCheckPointDto {
    @ApiProperty({ example: 1, description: 'Organization ID' })
    @IsNumber()
    organizationId: number;

    @ApiProperty({ example: 'Main Entrance', description: 'Title of the checkpoint' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({ example: true, description: 'Whether the checkpoint is active' })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean = true;

    @ApiProperty({ type: [CheckPointItemInput], description: 'List of checkpoint items' })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CheckPointItemInput)
    items: CheckPointItemInput[];
}
