import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ShiftTimeTypeEnum } from "src/shifts/domain/enums/shift-time-type.enum";

export class CreateShiftTimeDto {
    @ApiProperty({ example: "08:00", description: "Start time of the shift" })
    @IsString()
    @IsNotEmpty()
    startTime: string;

    @ApiProperty({ example: "16:00", description: "End time of the shift" })
    @IsString()
    @IsNotEmpty()
    endTime: string;

    @ApiProperty({ example: ShiftTimeTypeEnum.WORK, enum: ShiftTimeTypeEnum })
    @IsEnum(ShiftTimeTypeEnum)
    type: ShiftTimeTypeEnum;
}

export class CreateShiftDto {
    @ApiProperty({ example: 1, description: "Organization ID" })
    @IsNumber()
    @IsNotEmpty()
    organizationId: number;

    @ApiProperty({ example: "Morning Shift", description: "Shift title" })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ type: [CreateShiftTimeDto], description: "Array of shift times" })
    @IsArray()
    @IsNotEmpty()
    shiftTimes: CreateShiftTimeDto[];
}
