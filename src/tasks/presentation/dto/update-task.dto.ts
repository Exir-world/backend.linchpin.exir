import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsDate, IsArray } from 'class-validator';

export class UpdateTaskDto {
    @ApiProperty({ example: 1, description: 'Task ID to update' })
    @IsInt()
    taskId: number;

    @ApiProperty({ example: 'New Title', required: false })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({ example: 'Updated Description', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 2, required: false })
    @IsOptional()
    @IsInt()
    priorityId?: number;

    @ApiProperty({ example: '2025-02-12', required: false })
    @IsOptional()
    @IsString()
    date?: Date;

    @ApiProperty({ example: 3, required: false })
    @IsOptional()
    @IsInt()
    userId?: number;

    @ApiProperty({ example: [1, 2, 3], required: false })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    taskTags?: number[];
}