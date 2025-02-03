import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshDto {
    @ApiProperty({ example: 'string', description: 'رفرش توکن' })
    @IsString({ message: 'رفرش باید یک رشته باشد' })
    @IsNotEmpty({ message: 'رفرش نمی‌تواند خالی باشد' })
    refreshToken: string;
}
