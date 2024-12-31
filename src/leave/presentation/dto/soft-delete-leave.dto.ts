import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class SoftDeleteLeaveDto {
    @ApiProperty({ description: 'شناسه مرخصی' })
    @IsNumber()
    @IsNotEmpty()
    leaveId: number;
}
