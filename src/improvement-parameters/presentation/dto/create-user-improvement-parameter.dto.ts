import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateUserImprovementParameterDto {
  @ApiProperty({ example: 1, description: 'The ID of the self-improvement being evaluated' })
  @IsInt()
  improvementId: number;

  @ApiProperty({ example: 3, description: 'The user’s score: 3' })
  @IsInt()
  userScore: number;

  @ApiProperty({ example: '', description: '' })
  @IsString()
  description: string;
}
