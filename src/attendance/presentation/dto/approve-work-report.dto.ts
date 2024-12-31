import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, IsString, IsBoolean, IsOptional } from 'class-validator';

export class ApproveWorkReportDto {
    @ApiProperty({ example: 1, description: 'شناسه گزارش کار' })
    @IsInt({ message: 'شناسه باید عدد صحیح باشد' })
    @Min(1, { message: 'شناسه باید بزرگتر از صفر باشد' })
    workReportId: number;

    @ApiProperty({ example: true, description: 'وضعیت تأیید (true برای تأیید، false برای رد)' })
    @IsBoolean({ message: 'وضعیت تأیید باید بولین باشد' })
    accepted: boolean;

    @ApiProperty({ example: 'گزارش به‌خوبی انجام شده است', description: 'نظر سوپروایزر', required: false })
    @IsString({ message: 'نظر باید یک رشته باشد' })
    @IsOptional()
    comment?: string;

    @ApiProperty({ example: 2, description: 'شناسه سوپروایزر' })
    @IsInt({ message: 'شناسه سوپروایزر باید عدد صحیح باشد' })
    @Min(1, { message: 'شناسه سوپروایزر باید بزرگتر از صفر باشد' })
    acceptedBy: number;
}
