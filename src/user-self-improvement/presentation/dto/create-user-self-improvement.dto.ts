import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsArray, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserSelfImprovementItemDto {
  @ApiProperty({ example: 1, description: 'The ID of the self-improvement being evaluated' })
  @IsInt()
  improvementId: number;

  @ApiProperty({ example: 13, description: 'The user’s score: 13' })
  @IsInt()
  userScore: number;

  @ApiProperty({ example: '', description: '' })
  @IsString()
  description: string;
}
