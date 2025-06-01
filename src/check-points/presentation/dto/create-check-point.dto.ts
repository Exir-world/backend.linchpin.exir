import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class CheckPointItemInput {
    @IsNumber()
    lat: number;

    @IsNumber()
    lng: number;

    @IsOptional()
    @IsNumber()
    radius?: number = 50;

    @IsOptional()
    @IsBoolean()
    needReport?: boolean = false;
}

export class CreateCheckPointDto {
    @IsNumber()
    organizationId: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean = true;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CheckPointItemInput)
    items: CheckPointItemInput[];
}
