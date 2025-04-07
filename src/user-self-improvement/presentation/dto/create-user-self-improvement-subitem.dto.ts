import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserSelfImprovementSubItemDto {
  @ApiProperty({ example: 1, description: 'The ID of the self-improvement being evaluated' })
  @IsInt()
  @IsNotEmpty()
  itemId: number;

  @ApiProperty({ example: 1, description: 'The ID of the self-improvement being evaluated' })
  @IsNotEmpty()
  @IsInt()
  subItemId: number;

  @ApiProperty({ example: 13, description: 'The user’s score: 13' })
  @IsNotEmpty()
  @IsInt()
  userScore: number;
}
