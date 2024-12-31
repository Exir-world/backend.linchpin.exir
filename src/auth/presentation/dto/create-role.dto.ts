import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateRoleDto {
    @ApiProperty({ example: 'Admin', description: 'Name of the role' })
    @IsString({ message: 'نام role باید یک رشته باشد' })
    @IsNotEmpty({ message: 'نام role نمی‌تواند خالی باشد' })
    @MaxLength(50, { message: 'نام role نمی‌تواند بیش از 50 کاراکتر باشد' })
    name: string;
}
