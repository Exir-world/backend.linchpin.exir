import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class CreateUserEmploymentSettingsDto {
    @ApiProperty({ example: 1, description: "User ID" })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ example: 2, description: "Shift ID assigned to the user" })
    @IsNumber()
    @IsNotEmpty()
    shiftId: number;

    @ApiProperty({ example: 10000000, description: "Salary" })
    @IsNumber()
    @IsNotEmpty()
    salary: number;

    @ApiProperty({ example: true, description: "User need be in location for attendance" })
    @IsBoolean()
    @IsNotEmpty()
    needLocation: boolean;

    @ApiProperty({ example: 3, description: "Team ID assigned to the user", nullable: true })
    @IsNumber()
    teamId?: number;
}
