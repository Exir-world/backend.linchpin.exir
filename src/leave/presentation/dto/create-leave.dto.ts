import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDate, IsInt } from 'class-validator';
import { LeaveTypeEnum } from '../../domain/enums/leave-type.enum';
import { Type } from 'class-transformer';

export class CreateLeaveDto {
    @ApiProperty({ description: 'شناسه کاربر' })
    @IsInt()
    userId: number;

    @ApiProperty({ enum: LeaveTypeEnum })
    @IsEnum(LeaveTypeEnum)
    @IsNotEmpty()
    type: LeaveTypeEnum;

    @ApiProperty({ description: 'توضیحات مرخصی', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'زمان شروع مرخصی' })
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    startTime: Date;

    @ApiProperty({ description: 'زمان پایان مرخصی' })
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    endTime: Date;
}
