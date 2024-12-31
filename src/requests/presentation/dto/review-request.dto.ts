import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class ReviewRequestDto {
    @ApiProperty({ description: 'شناسه درخواست' })
    @IsInt()
    requestId: number;

    @ApiProperty({ enum: ['APPROVE', 'REJECT'], description: 'عملیات تایید یا رد' })
    @IsString()
    action: 'APPROVE' | 'REJECT';

    @ApiProperty({ description: 'توضیحات ادمین', required: false })
    @IsOptional()
    adminComment?: string;
}
