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

    @ApiProperty({ example: "#FF5733", description: "The text color of the tag" })
    @IsString()
    @IsNotEmpty()
    textColor: string;

    @ApiProperty({ example: "https://cdn.exirtu.be/linchpin/tag_content_icon.svg", description: "The icon of the tag" })
    @IsString()
    @IsNotEmpty()
    icon: string;
}
