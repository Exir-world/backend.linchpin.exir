import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
    Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PermissionsGuard } from 'src/auth/application/guards/permission.guard';
import { Permissions } from 'src/auth/application/decorators/permissions.decorator';
import { CreateRoleDto } from '../dto/create-role.dto';
import { GetRolesQuery } from 'src/auth/application/queries/handlers/get-roles.query';
import { GetRoleQuery } from 'src/auth/application/queries/handlers/get-role.query';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { UpdateRoleCommand } from 'src/auth/application/commands/update-role.command';
import { DeleteRoleCommand } from 'src/auth/application/commands/delete-role.command';
import { CreateRoleCommand } from 'src/auth/application/commands/create-role.command';
import { UserAuthGuard } from 'src/auth/application/guards/user-auth.guard';
import { Permission } from 'src/auth/domain/enums/permission.enum';

@UseGuards(UserAuthGuard, PermissionsGuard)
@ApiBearerAuth()
@ApiTags('Roles')
@Controller('roles')
export class RoleController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Permissions(Permission.CreateRole)
    @Post()
    @ApiOperation({ summary: 'Create a new role' })
    async createRole(@Body() createRoleDto: CreateRoleDto, @Req() req) {
        const organizationId = req.user.organizationId;
        console.log('Creating role with organizationId:', req.user);

        const result = await this.commandBus.execute(
            new CreateRoleCommand(
                organizationId,
                createRoleDto.name,
                createRoleDto.description,
                createRoleDto.permissions,
            ),
        );

        return result;
    }

    @Permissions(Permission.ReadRole)
    @Get()
    @ApiOperation({ summary: 'Get all roles' })
    async getRoles(@Req() req) {
        const organizationId = req.user.organizationId;
        return this.queryBus.execute(new GetRolesQuery(organizationId));
    }

    @Permissions(Permission.ReadRole)
    @Get(':id(\\d+)')
    @ApiOperation({ summary: 'Get a role by ID' })
    async getRole(@Param('id') id: number) {
        return this.queryBus.execute(new GetRoleQuery(id));
    }

    @Permissions(Permission.UpdateRole)
    @Put(':id')
    @ApiOperation({ summary: 'Update a role by ID' })
    async updateRole(
        @Param('id') id: number,
        @Body() updateRoleDto: UpdateRoleDto,
        @Req() req,
    ) {
        const result = await this.commandBus.execute(
            new UpdateRoleCommand(
                id,
                updateRoleDto.name,
                updateRoleDto.description,
                updateRoleDto.permissions,
            ),
        );

        return result;
    }

    @Permissions(Permission.DeleteRole)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a role by ID' })
    async deleteRole(@Param('id') id: number, @Req() req) {
        const result = await this.commandBus.execute(new DeleteRoleCommand(id));

        return result;
    }

    // Todo
    // @UseGuards(JwtAuthGuard)
    // @Get('permissions')
    // @ApiOperation({ summary: 'Get all permissions' })
    // async getPermissions() {
    //     return this.queryBus.execute(new GetPermissionsQuery());
    // }
}
