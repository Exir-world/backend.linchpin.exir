import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CheckOutDto {
    @ApiProperty({ example: 36.3636, description: 'عرض جغرافیایی' })
    @IsNumber()
    lat: number;

    @ApiProperty({ example: 59.5959, description: 'طول جغرافیایی' })
    @IsNumber()
    lng: number;
}
