import { IsNotEmpty, IsString, ValidateNested, ArrayMinSize, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePropertyCategoryDto {
    @ApiProperty({ description: 'The title of the property category' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiPropertyOptional({
        description: 'An optional array of features for the property category',
        type: [String],
    })
    @IsOptional()
    @Type(() => String)
    features?: string[];
}