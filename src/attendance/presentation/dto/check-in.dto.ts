import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CheckInDto {
    @ApiProperty({ example: 36.3636, description: 'عرض جغرافیایی' })
    @IsNumber()
    lat: number;

    @ApiProperty({ example: 59.5959, description: 'طول جغرافیایی' })
    @IsNumber()
    lng: number;
}
