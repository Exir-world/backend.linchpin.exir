import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class EndStopDto {
    @ApiProperty({ description: 'ID of the stop to end' })
    @IsNumber()
    stopId: number;
}
