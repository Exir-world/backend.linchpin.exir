import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePropertyReportDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    propertyId: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    report: string;
}
