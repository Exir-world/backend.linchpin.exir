import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTagDto {
    @ApiProperty({ example: "Urgent", description: "The title of the tag" })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: "#FF5733", description: "The color of the tag" })
    @IsString()
    @IsNotEmpty()
    color: string;
}
