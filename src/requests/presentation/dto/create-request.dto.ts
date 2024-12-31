import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { RequestType } from 'src/requests/domain/enums/request-type.enum';

export class CreateRequestDto {
    @ApiProperty({ enum: RequestType, description: 'نوع درخواست' })
    @IsEnum(RequestType)
    type: RequestType;

    @ApiProperty({ description: 'توضیحات درخواست', required: false })
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'زمان شروع درخواست', required: false, type: String, format: 'date-time' })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    startTime?: Date;

    @ApiProperty({ description: 'زمان پایان درخواست', required: false, type: String, format: 'date-time' })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    endTime?: Date;
}
