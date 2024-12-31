import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CheckInDto {
    @ApiProperty({ example: 1, description: 'شناسه کاربر' })
    @IsInt({ message: 'شناسه کاربر باید عدد صحیح باشد' })
    @Min(1, { message: 'شناسه کاربر باید بزرگتر از صفر باشد' })
    userId: number;
}
