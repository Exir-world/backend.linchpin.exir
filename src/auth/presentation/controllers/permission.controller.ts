import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { PermissionService } from 'src/auth/application/services/permission.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { CreatePermissionCommand } from 'src/auth/application/commands/create-permission.command';
import { GetAllPermissionsQuery } from 'src/auth/application/queries/get-all-permissions.query';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Permission created successfully.' })
    async createPermission(@Body() createPermissionDto: CreatePermissionDto): Promise<void> {
        await this.permissionService.createPermission(
            new CreatePermissionCommand(createPermissionDto.name)
        );
    }

    @Get()
    @ApiResponse({ status: 200, description: 'List of all permissions.' })
    async findAllPermissions(): Promise<any> {
        return this.permissionService.findAllPermissions(new GetAllPermissionsQuery());
    }
}
