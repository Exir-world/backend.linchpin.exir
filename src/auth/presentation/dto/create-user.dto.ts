import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPhoneNumber, MinLength, MaxLength, IsInt, IsNumber, IsOptional, ValidateNested, IsBoolean, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

class SettingsDto {
    @ApiPropertyOptional({ example: 101, description: 'شناسه تیم' })
    @IsNumber()
    @IsOptional()
    teamId?: number;

    @ApiPropertyOptional({ example: 1, description: 'شناسه دپارتمان' })
    @IsNumber()
    @IsOptional()
    departmentId?: number;

    @ApiPropertyOptional({ example: 5, description: 'شناسه شیفت' })
    @IsNumber()
    @IsOptional()
    shiftId?: number;

    @ApiPropertyOptional({ example: 50000, description: 'حقوق کاربر' })
    @IsNumber()
    @IsOptional()
    salary?: number;

    @ApiPropertyOptional({ example: true, description: 'آیا نیاز به موقعیت مکانی دارد' })
    @IsOptional()
    needToLocation?: boolean;
}

export class CreateUserDto {
    @ApiProperty({ example: 'John', description: 'نام کاربر' })
    @IsString({ message: 'نام باید یک رشته باشد' })
    @IsNotEmpty({ message: 'نام نمی‌تواند خالی باشد' })
    @MaxLength(50, { message: 'نام نمی‌تواند بیشتر از 50 کاراکتر باشد' })
    name: string;

    @ApiPropertyOptional({ example: '', description: 'تصویر کاربر' })
    @IsString()
    @IsOptional()
    profileImage: string;

    @ApiProperty({ example: 'Doe', description: 'نام خانوادگی کاربر' })
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

    @ApiPropertyOptional({ description: 'تنظیمات کاربر' })
    @ValidateNested()
    @Type(() => SettingsDto)
    @IsOptional()
    settings?: SettingsDto;

    @ApiProperty({ example: 'John', description: 'نام کوچک کاربر' })
    @IsString({ message: 'نام کوچک باید یک رشته باشد' })
    @IsNotEmpty({ message: 'نام کوچک نمی‌تواند خالی باشد' })
    @MaxLength(50, { message: 'نام کوچک نمی‌تواند بیشتر از 50 کاراکتر باشد' })
    firstname: string;

    @ApiProperty({ example: '1234567890', description: 'کد ملی کاربر' })
    @IsString({ message: 'کد ملی باید یک رشته باشد' })
    @IsNotEmpty({ message: 'کد ملی نمی‌تواند خالی باشد' })
    @MaxLength(10, { message: 'کد ملی نمی‌تواند بیشتر از 10 کاراکتر باشد' })
    nationalCode: string;

    @ApiProperty({ example: 'P12345', description: 'کد پرسنلی کاربر' })
    @IsString({ message: 'کد پرسنلی باید یک رشته باشد' })
    @IsNotEmpty({ message: 'کد پرسنلی نمی‌تواند خالی باشد' })
    @MaxLength(20, { message: 'کد پرسنلی نمی‌تواند بیشتر از 20 کاراکتر باشد' })
    personnelCode: string;

    @ApiProperty({ example: false, description: 'وضعیت حذف کاربر' })
    @IsBoolean()
    @IsNotEmpty()
    isDeleted: boolean = false;

    @ApiProperty({ example: false, description: 'دسترسی به پنل ادمین' })
    @IsBoolean()
    @IsNotEmpty()
    hasAdminPanelAccess: boolean = false;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
