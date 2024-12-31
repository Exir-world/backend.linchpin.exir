import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStopDto {
    @ApiProperty({ description: 'Attendance ID related to the stop' })
    @IsNumber()
    attendanceId: number;

    @ApiProperty({ description: 'Reason for the stop' })
    @IsString()
    @IsOptional()
    reason?: string;
}
