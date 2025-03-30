import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class GetAdminAttendancesReportDto {
  @ApiProperty({
    description: 'The start date of the range.',
    example: '2025-03-01T00:00:00Z',
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'The end date of the range.',
    example: '2025-03-31T23:59:59Z',
  })
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: 'The number of holidays within the date range.',
    example: 5,
  })
  @IsOptional()
  @IsNotEmpty()
  holidaysDayCount: number;
}
