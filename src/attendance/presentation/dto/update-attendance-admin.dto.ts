import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Min, IsString, IsBoolean, IsOptional, IsDate, IsISO8601 } from 'class-validator';

export class UpdateAttendanceAdminDto {
    @ApiProperty({ example: 1, description: 'شناسه' })
    @IsInt({ message: 'شناسه باید عدد صحیح باشد' })
    attendanceId: number;

    @ApiPropertyOptional({ example: new Date(), required: false })
    @IsISO8601()
    @IsOptional()
    checkIn?: Date;

    @ApiPropertyOptional({ example: new Date(), required: false })
    @IsISO8601()
    @IsOptional()
    checkOut?: Date;
}
