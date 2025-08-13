import { IsNumber, IsString, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetAllUsersDto {
    @ApiProperty({
        required: false,
        type: Number,
        description: 'شناسه دپارتمان (اختیاری)',
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    departmentId?: number;

    @ApiProperty({
        required: false,
        type: Number,
        description: 'شناسه تیم (اختیاری)',
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    teamId?: number;

    @ApiProperty({
        required: false,
        type: String,
        description: 'کد پرسنلی (اختیاری)',
    })
    @IsOptional()
    @IsString()
    personnelCode?: string;

    @ApiProperty({
        required: false,
        type: String,
        description: 'کد ملی (اختیاری)',
    })
    @IsOptional()
    @IsString()
    nationalCode?: string;

    @ApiProperty({
        required: false,
        type: String,
        description: 'شماره همراه (اختیاری)',
    })
    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @ApiProperty({
        required: false,
        type: String,
        description: 'نام (اختیاری)',
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        required: false,
        type: Number,
        description: 'شماره صفحه (اختیاری، پیش‌فرض: 1)',
        default: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page: number = 1;

    @ApiProperty({
        required: false,
        type: Number,
        description: 'تعداد آیتم‌ها در هر صفحه (اختیاری، پیش‌فرض: 10)',
        default: 10,
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit: number = 10;
}