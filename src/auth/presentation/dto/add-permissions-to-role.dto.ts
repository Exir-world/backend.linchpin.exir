import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, ArrayNotEmpty, Min } from 'class-validator';

export class AddPermissionsToRoleDto {
    @ApiProperty({
        example: [1],
        description: 'List of permission IDs to add to the role',
        isArray: true,
    })
    @IsArray({ message: 'permissions باید یک آرایه باشد' })
    @ArrayNotEmpty({ message: 'آرایه permissions نباید خالی باشد' })
    @IsInt({ each: true, message: 'هر مقدار در permissions باید یک عدد صحیح باشد' })
    @Min(1, { each: true, message: 'مقدار هر permission باید حداقل 1 باشد' })
    permissions: number[];
}
