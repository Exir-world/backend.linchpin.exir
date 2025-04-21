import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyCategoryFeatureDto {
    @ApiProperty({ description: 'The title of the property category feature' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: 'The ID of the category', minimum: 1 })
    @IsInt()
    @Min(1)
    categoryId: number;
}