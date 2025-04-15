import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PropertyStatusEnum } from 'src/properties/domain/enums/property-status.enum';

export class CreatePropertyDto {
    @ApiProperty({ type: String, description: 'The title of the property' })
    @IsString()
    @IsNotEmpty()
    title: string;

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
}
