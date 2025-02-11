import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class DoneSubtaskDto {
    @ApiProperty({ example: 1, description: "The ID of the subtask" })
    @IsNumber()
    @IsNotEmpty()
    subtaskId: number;

    @ApiProperty({ example: true, description: "The done status of subtask" })
    @IsBoolean()
    done: boolean;
}
