import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyFeatureDto {
    @ApiProperty({ description: 'ID of the property', example: 1 })
    @IsInt()
    @Min(1)
    propertyId: number;

    @ApiProperty({ description: 'ID of the feature', example: 1 })
    @IsInt()
    @Min(1)
    featureId: number;

    @ApiProperty({ description: 'Value of the feature', example: 'Some value' })
    @IsNotEmpty()
    @IsString()
    value: string;
}