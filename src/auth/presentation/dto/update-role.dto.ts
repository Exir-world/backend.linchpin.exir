// update-role.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { IsEnum, IsArray } from 'class-validator';
import { Permission } from 'src/auth/domain/enums/permission.enum';

export class UpdateRoleDto {
  @ApiProperty({
    description: 'Name of the role',
    maxLength: 50,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @ApiPropertyOptional({ description: 'Description of the role' })
  @IsOptional()
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
