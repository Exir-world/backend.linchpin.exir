// create-role.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Permission } from 'src/auth/domain/enums/permission.enum';

export class CreateRoleDto {
  @ApiProperty({ description: 'Name of the role', maxLength: 50 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiPropertyOptional({ description: 'Description of the role' })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'List of permissions for the role',
    enum: Permission,
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(Permission, { each: true })
  permissions?: Permission[];
}
