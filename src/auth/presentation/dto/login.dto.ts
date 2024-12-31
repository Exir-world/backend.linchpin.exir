import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: '+1234567890', description: 'User phone number' })
    @IsString({ message: 'شماره تلفن باید یک رشته باشد' })
    @IsNotEmpty({ message: 'شماره تلفن نمی‌تواند خالی باشد' })
    @MaxLength(15, { message: 'شماره تلفن نمی‌تواند بیشتر از 15 کاراکتر باشد' })
    phoneNumber: string;

    @ApiProperty({ example: 'password123', description: 'User password' })
    @IsString({ message: 'رمز عبور باید یک رشته باشد' })
    @IsNotEmpty({ message: 'رمز عبور نمی‌تواند خالی باشد' })
    @MinLength(6, { message: 'رمز عبور باید حداقل 6 کاراکتر باشد' })
    @MaxLength(20, { message: 'رمز عبور نمی‌تواند بیشتر از 20 کاراکتر باشد' })
    password: string;
}
