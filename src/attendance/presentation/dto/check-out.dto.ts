import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CheckOutDto {
    @ApiProperty({ example: 1, description: 'شناسه رکورد حضور و غیاب' })
    @IsInt({ message: 'شناسه باید عدد صحیح باشد' })
    @Min(1, { message: 'شناسه باید بزرگتر از صفر باشد' })
    attendanceId: number;

    @ApiProperty({ example: 1, description: 'شناسه کاربر' })
    @IsInt({ message: 'شناسه باید عدد صحیح باشد' })
    userId: number;
}
