import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UserSelfImprovementItemDto {
  @ApiProperty({ example: 1, description: 'The ID of the self-improvement being evaluated' })
  @IsInt()
  improvementId: number;

  @ApiProperty({ example: 13, description: 'The user’s score (true/false)' })
  @IsInt()
  userScore: number;

  @ApiProperty({ example: '2025-01-27T00:00:00.000Z', description: 'Date of evaluation (ISO format)' })
  @IsDateString()
  date: Date;
}

export class CreateUserSelfImprovementDto {
  @ApiProperty({
    type: [UserSelfImprovementItemDto],
    description: 'Array of user self-improvement evaluations',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserSelfImprovementItemDto)
  items: UserSelfImprovementItemDto[];
}
