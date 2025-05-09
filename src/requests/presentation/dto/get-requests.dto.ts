import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { RequestStatus } from 'src/requests/domain/enums/request-status.enum';

export class GetAllRequestsDto {
    @ApiPropertyOptional({
        enum: RequestStatus,
        description: 'وضعیت درخواست (اختیاری)',
    })
    @IsOptional()
    @IsEnum(RequestStatus, { message: 'وضعیت باید یکی از مقادیر معتبر باشد.' })
    status?: RequestStatus;

    @ApiPropertyOptional({
        description: 'شناسه کاربر (اختیاری)',
        type: Number
    })
    @IsOptional()
    userId?: number;
}
