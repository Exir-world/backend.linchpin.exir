import {
    IsArray,
    IsBoolean,
    IsDateString,
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WeeklyTimeInputDto {
    @ApiProperty({ enum: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] })
    @IsString()
    @IsIn(['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
    dayOfWeek: string;

    @ApiProperty()
    @IsString()
    startTime: string; // e.g. "08:00"

    @ApiProperty()
    @IsString()
    endTime: string; // e.g. "17:00"

    @ApiPropertyOptional({ default: false })
    @IsOptional()
    @IsBoolean()
    isAbsent?: boolean = false;
}

export class CreateUserTimesDto {
    @ApiProperty()
    @IsNumber()
    userId: number;

    @ApiProperty({ type: [WeeklyTimeInputDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => WeeklyTimeInputDto)
    weeklyTimes: WeeklyTimeInputDto[];
}
