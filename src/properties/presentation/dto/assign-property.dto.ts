import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignPropertyDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ type: [Number] })
    @IsNumber({}, { each: true })
    @IsNotEmpty()
    propertyIds: number[];
}
