import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePermissionDto {
    @ApiProperty({ example: 'READ_USER', description: 'Name of the permission' })
    @IsString({ message: 'نام permission باید یک رشته باشد' })
    @IsNotEmpty({ message: 'نام permission نمی‌تواند خالی باشد' })
    @MaxLength(50, { message: 'نام permission نمی‌تواند بیش از 50 کاراکتر باشد' })
    name: string;
}
