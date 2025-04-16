import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateDepartmentDto {
    @ApiProperty()
    @IsOptional()
    @IsInt()
    organizationId?: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    supervisorId?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string;
}
