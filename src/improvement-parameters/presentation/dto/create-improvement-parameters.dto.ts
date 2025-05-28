import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ImprovementTypeEnum } from 'src/improvement-parameters/domain/enums/improvement-type.enum';

export class CreateImprovementParameterDto {
    @ApiProperty() @IsString() title: string;
    @ApiProperty({ enum: ImprovementTypeEnum }) @IsEnum(ImprovementTypeEnum) type: ImprovementTypeEnum;
    @ApiProperty({ required: false }) @IsOptional() @IsString() image?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() color?: string;
    @ApiProperty({ type: [Number], required: true }) @IsArray() score: number[];
}

export class CreateImprovementParameterWithSubDto {
    @ApiProperty() @IsString() title: string;
    @ApiProperty({ enum: ImprovementTypeEnum }) @IsEnum(ImprovementTypeEnum) type: ImprovementTypeEnum;
    @ApiProperty({ required: false }) @IsOptional() @IsString() image?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() color?: string;
    @ApiProperty({ type: [Number], required: false }) @IsArray() @IsOptional() score: number[] = [];

    @ApiProperty({ type: [CreateImprovementParameterDto], required: false })
    @ValidateNested({ each: true })
    @Type(() => CreateImprovementParameterDto)
    @IsArray()
    @IsOptional()
    children?: CreateImprovementParameterDto[];
}

export class CreateImprovementParametersDto {
    @ApiProperty({ type: [CreateImprovementParameterWithSubDto] })
    @IsArray()
    @IsNotEmpty({ each: true })
    items: CreateImprovementParameterWithSubDto[];
}