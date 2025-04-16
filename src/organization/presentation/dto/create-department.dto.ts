import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateDepartmentDto {
    @ApiProperty()
    @IsInt()
    organizationId: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    supervisorId?: number;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string;
}
