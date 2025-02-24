import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class MarkAsReadDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}
