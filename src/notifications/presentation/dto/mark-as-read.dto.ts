import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, ArrayNotEmpty } from 'class-validator';

export class MarkAsReadDto {
    @ApiProperty({ example: [1, 2, 3] })
    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    ids: number[];
}
