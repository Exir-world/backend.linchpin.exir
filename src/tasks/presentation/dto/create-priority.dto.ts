import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePriorityDto {
    @ApiProperty({ example: "High", description: "The title of the priority" })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 1, description: "The priority level (higher means more important)" })
    @IsNumber()
    @IsNotEmpty()
    priority: number;

    @ApiProperty({ example: "#FF0000", description: "The color representing the priority" })
    @IsString()
    @IsNotEmpty()
    color: string;
}
