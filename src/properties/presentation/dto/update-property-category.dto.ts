import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePropertyCategoryDto {
    @ApiProperty({ description: 'The title of the property category' })
    @IsNotEmpty()
    @IsString()
    title: string;
}