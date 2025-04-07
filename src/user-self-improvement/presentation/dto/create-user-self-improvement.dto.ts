import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

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
