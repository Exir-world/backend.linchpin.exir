import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class GetDailyAttendancesReportDto {
  @ApiProperty({
    description: 'The date of the range.',
    example: '2023-03-01',
  })
  @IsNotEmpty()
  @IsDateString()
  date: string;
}
