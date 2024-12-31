import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsOptional, MaxLength, MinLength, IsInt, Min } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ example: 'Jane Doe', description: 'نام جدید کاربر', required: false })
    @IsString({ message: 'نام باید یک رشته باشد' })
    @MaxLength(50, { message: 'نام نمی‌تواند بیش از 50 کاراکتر باشد' })
    @IsOptional()
    name?: string;

    @ApiProperty({ example: 'newSecurePassword123', description: 'رمز عبور جدید کاربر', required: false })
    @IsString({ message: 'رمز عبور باید یک رشته باشد' })
    @MinLength(8, { message: 'رمز عبور باید حداقل 8 کاراکتر باشد' })
    @MaxLength(20, { message: 'رمز عبور نمی‌تواند بیشتر از 20 کاراکتر باشد' })
    @IsOptional()
    password?: string;

    @ApiProperty({ example: 3, description: 'نقش جدید کاربر', required: false })
    @IsInt({ message: 'نقش باید یک عدد صحیح باشد' })
    @Min(1, { message: 'نقش نمی‌تواند کمتر از 1 باشد' })
    @IsOptional()
    role?: number;
}
