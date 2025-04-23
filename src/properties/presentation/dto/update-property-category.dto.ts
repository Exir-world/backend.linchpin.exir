import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class Feature1Dto {
    @ApiProperty({ description: 'The name of the feature' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiPropertyOptional({ description: 'The ID of the feature', required: false })
    @IsNumber()
    @IsOptional()
    id?: number;
}

export class UpdatePropertyCategoryDto {
    @ApiProperty({ description: 'The title of the property category' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiPropertyOptional({
        description: 'The list of features for the property category',
        required: false,
        type: () => [Feature1Dto],
    })
    @ValidateNested({ each: true })
    @Type(() => Feature1Dto)
    features?: Feature1Dto[];
}
