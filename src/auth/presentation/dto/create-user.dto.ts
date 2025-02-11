import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPhoneNumber, MinLength, MaxLength, IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 1, description: 'شناسه تیم' })
    @IsNumber()
    @IsNotEmpty()
    teamId: number;

    @ApiProperty({ example: 'John', description: 'نام کاربر' })
    @IsString({ message: 'نام باید یک رشته باشد' })
    @IsNotEmpty({ message: 'نام نمی‌تواند خالی باشد' })
    @MaxLength(50, { message: 'نام نمی‌تواند بیشتر از 50 کاراکتر باشد' })
    name: string;

    @ApiPropertyOptional({ example: '', description: 'تصویر کاربر' })
    @IsString()
    @IsOptional()
    profileImage: string;

    @ApiProperty({ example: 'Doe', description: 'نام خادنوادگی کاربر' })
    @IsString({ message: 'نام باید یک رشته باشد' })
    @IsNotEmpty({ message: 'نام نمی‌تواند خالی باشد' })
    @MaxLength(100, { message: 'نام نمی‌تواند بیشتر از 100 کاراکتر باشد' })
    lastname: string;

    @ApiProperty({ example: '+1234567890', description: 'شماره تلفن کاربر' })
    @IsPhoneNumber(null, { message: 'شماره تلفن باید معتبر باشد' })
    @IsNotEmpty({ message: 'شماره تلفن نمی‌تواند خالی باشد' })
    phoneNumber: string;

    @ApiProperty({ example: 'securePassword123', description: 'رمز عبور کاربر' })
    @IsString({ message: 'رمز عبور باید یک رشته باشد' })
    @IsNotEmpty({ message: 'رمز عبور نمی‌تواند خالی باشد' })
    @MinLength(8, { message: 'رمز عبور باید حداقل 8 کاراکتر باشد' })
    @MaxLength(20, { message: 'رمز عبور نمی‌تواند بیشتر از 20 کاراکتر باشد' })
    password: string;

    @ApiProperty({ example: 3, description: 'نقش کاربر' })
    @IsInt({ message: 'نقش باید یک عدد صحیح باشد' })
    role: number;
}
