import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PropertyReportStatusEnum } from 'src/properties/domain/enums/property-report-status.enum';

export class ChangeReportStatusDto {
    @ApiProperty({
        description: 'وضعیت گزارش',
        enum: PropertyReportStatusEnum,  // می‌تونی مقدارهای Enum رو در Swagger به صورت لیست نشان بدی
    })
    @IsEnum(PropertyReportStatusEnum)
    @IsNotEmpty()
    status: PropertyReportStatusEnum;
}
