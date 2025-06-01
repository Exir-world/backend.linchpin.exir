import { IsArray, IsBoolean, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CheckPointItemUpdateDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    id?: number;

    @ApiProperty()
    @IsNumber()
    lat: number;

    @ApiProperty()
    @IsNumber()
    lng: number;

    @ApiProperty({ default: 50 })
    @IsOptional()
    @IsNumber()
    radius?: number = 50;

    @ApiProperty({ default: false })
    @IsOptional()
    @IsBoolean()
    needReport?: boolean = false;
}

export class UpdateCheckPointItemsDto {
    @ApiProperty({ type: [CheckPointItemUpdateDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CheckPointItemUpdateDto)
    items: CheckPointItemUpdateDto[];
}
