import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class GetNotificationsDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @Min(1)
    @Type(() => Number) // ✅ تبدیل ورودی به عدد
    userId: number;

    @ApiProperty({ example: 1, required: false })
    @IsNumber()
    @Min(1)
    @IsOptional()
    @Type(() => Number) // ✅ تبدیل ورودی به عدد
    page?: number;

    @ApiProperty({ example: 10, required: false })
    @IsNumber()
    @Min(1)
    @IsOptional()
    @Type(() => Number) // ✅ تبدیل ورودی به عدد
    limit?: number;
}
