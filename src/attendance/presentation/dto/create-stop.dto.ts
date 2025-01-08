import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateStopDto {
    @ApiProperty({ description: 'Reason for the stop' })
    @IsString()
    @IsOptional()
    reason?: string;
}
