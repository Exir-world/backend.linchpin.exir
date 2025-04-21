import { IsNotEmpty, IsString, ValidateNested, ArrayMinSize, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class FeatureDto {
    @ApiProperty({ description: 'The title of the feature' })
    @IsNotEmpty()
    @IsString()
    title: string;
}

export class CreatePropertyCategoryDto {
    @ApiProperty({ description: 'The title of the property category' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiPropertyOptional({
        description: 'An optional array of features for the property category',
        type: [FeatureDto],
    })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => FeatureDto)
    features?: FeatureDto[];
}