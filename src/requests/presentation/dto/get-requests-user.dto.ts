import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { RequestStatus } from 'src/requests/domain/enums/request-status.enum';

export class GetRequestsUserDto {
    @ApiPropertyOptional({
        enum: RequestStatus,
        description: 'وضعیت درخواست (اختیاری)',
    })
    @IsOptional()
    @IsEnum(RequestStatus, { message: 'وضعیت باید یکی از مقادیر معتبر باشد.' })
    status?: RequestStatus;

    @ApiPropertyOptional({
        description: 'تاریخ شروع (اختیاری)',
    })
    @IsOptional()
    @IsDateString()
    startTime?: Date;

    @ApiPropertyOptional({
        description: 'تاریخ پایان (اختیاری)',
    })
    @IsOptional()
    @IsDateString()
    endTime?: Date;
}
