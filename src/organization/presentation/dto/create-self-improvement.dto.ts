import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsString, ValidateNested, IsArray, Min } from 'class-validator';
import { Type } from 'class-transformer';

class CreateSelfImprovementItemDto {
    @ApiProperty({ example: "Read a book", description: "Title of the improvement item" })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 10, description: "Score for the improvement item" })
    @IsNumber()
    @Min(0)
    score: number;

    @ApiProperty({ example: "https://...", description: "Image of the improvement item" })
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({ example: "#000000", description: "Color of the improvement item" })
    @IsString()
    @IsNotEmpty()
    color: string;
}

export class CreateSelfImprovementDto {
    @ApiProperty({ example: 1, description: "Organization ID associated with the improvement" })
    @IsNumber()
    @Min(1)
    organizationId: number;

    @ApiProperty({ example: "Daily Productivity Challenge", description: "Title of the self-improvement program" })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: "Improving daily habits to be more productive.", description: "Description of the self-improvement program", required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ type: [CreateSelfImprovementItemDto], description: "List of items associated with the self-improvement" })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSelfImprovementItemDto)
    items: CreateSelfImprovementItemDto[];
}
