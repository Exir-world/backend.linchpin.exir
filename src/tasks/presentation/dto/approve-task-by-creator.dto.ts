import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ApproveTaskByCreatorDto {
    @ApiProperty({ example: 1, description: "The ID of the task" })
    @IsNumber()
    @IsNotEmpty()
    taskId: number;

    @ApiPropertyOptional({ example: "Complete and submit the project report", description: "The comment of the creator" })
    @IsString()
    @IsOptional()
    comment: string;
}
