import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsArray, IsBoolean } from 'class-validator';

class SubtaskDto {
    @ApiProperty({ example: 1, required: false })
    @IsOptional()
    @IsInt()
    id?: number;

    @ApiProperty({ example: 'Subtask 1' })
    @IsString()
    title: string;
}

export class UpdateSubtasksDto {
    @ApiProperty({ example: 1, description: 'Task ID for subtasks' })
    @IsInt()
    taskId: number;

    @ApiProperty({
        example: [{ title: 'Subtask 1' }],
        description: 'List of subtasks'
    })
    @IsArray()
    subtasks: SubtaskDto[];
}