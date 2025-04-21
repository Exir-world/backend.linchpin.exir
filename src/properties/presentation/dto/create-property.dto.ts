import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PropertyStatusEnum } from 'src/properties/domain/enums/property-status.enum';

export class CreatePropertyDto {
    @ApiProperty({ type: Number, description: 'The ID of the category' })
    @IsNumber()
    @IsNotEmpty()
    categoryId: number;

    @ApiPropertyOptional({ type: String, description: 'The brand of the property' })
    @IsString()
    @IsOptional()
    brand?: string;

    @ApiPropertyOptional({ type: String, description: 'The model of the property' })
    @IsString()
    @IsOptional()
    model?: string;

    @ApiPropertyOptional({ type: String, description: 'The description of the property' })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({ type: String, description: 'The unique code of the property' })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({ enum: PropertyStatusEnum, example: PropertyStatusEnum.GOOD, description: 'The status of the property' })
    @IsNotEmpty()
    status: PropertyStatusEnum;

    @ApiProperty({ type: Number, description: 'The ID of the organization' })
    @IsNumber()
    @IsNotEmpty()
    organizationId: number;

    @ApiPropertyOptional({ type: Number, required: false, description: 'The optional ID of the department' })
    @IsNumber()
    @IsOptional()
    departmentId?: number;

    @ApiPropertyOptional({ type: String, required: false, description: 'The optional image URL of the property' })
    @IsString()
    @IsOptional()
    imageUrl?: string;

    @ApiPropertyOptional({ type: () => [FeatureDto], description: 'The optional features of the property' })
    @IsOptional()
    features?: FeatureDto[];
}

class FeatureDto {
    @ApiProperty({ type: Number, description: 'The ID of the feature' })
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiPropertyOptional({ type: String, description: 'The value of the feature' })
    @IsString()
    @IsOptional()
    value?: string;
}
