import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateRoleCommand } from '../commands/create-role.command';
import { GetRolesQuery } from '../queries/get-roles.query';
import { GetRoleDetailsQuery } from '../queries/get-role-details.query';
import { AddPermissionsToRoleCommand } from '../commands/add-permissions-to-role.command';

@Injectable()
export class RoleService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    async createRole(command: CreateRoleCommand): Promise<void> {
        await this.commandBus.execute(command);
    }

    async addPermissionsToRole(command: AddPermissionsToRoleCommand): Promise<void> {
        await this.commandBus.execute(command);
    }

    async getRoles(query: GetRolesQuery): Promise<any> {
        return this.queryBus.execute(query);
    }

    async getRoleDetails(query: GetRoleDetailsQuery): Promise<any> {
        return this.queryBus.execute(query);
    }
}
