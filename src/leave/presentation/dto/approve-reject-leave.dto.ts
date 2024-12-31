import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class ApproveRejectLeaveDto {
    @ApiProperty({ description: 'وضعیت تأیید (true برای تایید، false برای رد)' })
    @IsBoolean()
    @IsNotEmpty()
    accepted: boolean;

    @ApiProperty({ description: 'توضیحات مدیر', required: false })
    @IsOptional()
    @IsString()
    comment?: string;
}
