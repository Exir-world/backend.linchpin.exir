import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateTeamDto {
    @ApiProperty()
    @IsNumber()
    organizationId: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    supervisorId?: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ default: '#1E73E3' })
    @IsOptional()
    @IsString()
    color?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;
}
