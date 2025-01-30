import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UserCriterionItemDto {
  @ApiProperty({ example: 1, description: 'The ID of the criterion being evaluated' })
  @IsInt()
  criterionId: number;

  @ApiProperty({ example: true, description: 'The user’s score (true/false)' })
  @IsBoolean()
  userScore: boolean;

  @ApiProperty({ example: '2025-01-27T00:00:00.000Z', description: 'Date of evaluation (ISO format)' })
  @IsDateString()
  date: Date;
}

export class CreateUserCriteriaDto {
  @ApiProperty({
    type: [UserCriterionItemDto],
    description: 'Array of user criterion evaluations',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserCriterionItemDto)
  criteria: UserCriterionItemDto[];
}
