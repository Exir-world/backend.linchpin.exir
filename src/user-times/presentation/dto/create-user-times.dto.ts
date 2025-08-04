import {
    IsArray,
    IsBoolean,
    IsDateString,
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WeeklyTimeInputDto {
    @ApiProperty()
    @IsNumber()
    @Min(0)
    @Max(6)
    dayOfWeek: number;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    startTime: string; // e.g. "08:00"

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
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
