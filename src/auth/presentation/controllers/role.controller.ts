// src/modules/auth/presentation/controllers/role.controller.ts
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateRoleDto } from '../dto/create-role.dto';
import { RoleService } from '../../application/services/role.service';
import { AddPermissionsToRoleDto } from '../dto/add-permissions-to-role.dto';
import { CreateRoleCommand } from 'src/auth/application/commands/create-role.command';
import { AddPermissionsToRoleCommand } from 'src/auth/application/commands/add-permissions-to-role.command';
import { GetRolesQuery } from 'src/auth/application/queries/get-roles.query';
import { GetRoleDetailsQuery } from 'src/auth/application/queries/get-role-details.query';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Role created successfully.' })
    async createRole(@Body() createRoleDto: CreateRoleDto): Promise<void> {
        await this.roleService.createRole(new CreateRoleCommand(createRoleDto.name));
    }

    @Post(':roleId/permissions')
    @ApiResponse({ status: 201, description: 'Permissions added to role successfully.' })
    async addPermissionsToRole(
        @Param('roleId') roleId: number,
        @Body() addPermissionsToRoleDto: AddPermissionsToRoleDto,
    ): Promise<void> {
        await this.roleService.addPermissionsToRole(
            new AddPermissionsToRoleCommand(
                roleId,
                addPermissionsToRoleDto.permissions
            )
        );
    }

    @Get()
    @ApiResponse({ status: 200, description: 'List of roles.' })
    async getRoles(): Promise<any> {
        return this.roleService.getRoles(new GetRolesQuery());
    }

    @Get(':roleId')
    @ApiResponse({ status: 200, description: 'Role details.' })
    async getRoleDetails(@Param('roleId') roleId: number): Promise<any> {
        return this.roleService.getRoleDetails(new GetRoleDetailsQuery(roleId));
    }
}
