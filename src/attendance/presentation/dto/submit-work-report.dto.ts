import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, IsString, IsNotEmpty } from 'class-validator';

export class SubmitWorkReportDto {
    @ApiProperty({ example: 1, description: 'شناسه رکورد حضور و غیاب' })
    @IsInt({ message: 'شناسه باید عدد صحیح باشد' })
    @Min(1, { message: 'شناسه باید بزرگتر از صفر باشد' })
    attendanceId: number;

    @ApiProperty({ example: 'انجام وظایف روزانه', description: 'گزارش کار' })
    @IsString({ message: 'گزارش باید یک رشته باشد' })
    @IsNotEmpty({ message: 'گزارش کار نمی‌تواند خالی باشد' })
    reportText: string;

    @ApiProperty({ example: 1, description: 'شناسه کاربر' })
    @IsInt({ message: 'شناسه باید عدد صحیح باشد' })
    @Min(1, { message: 'شناسه باید بزرگتر از صفر باشد' })
    userId: number;
}
