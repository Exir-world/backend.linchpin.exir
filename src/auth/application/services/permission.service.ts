import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePermissionCommand } from '../commands/create-permission.command';
import { GetAllPermissionsQuery } from '../queries/get-all-permissions.query';

@Injectable()
export class PermissionService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    async createPermission(command: CreatePermissionCommand): Promise<void> {
        await this.commandBus.execute(command);
    }

    async findAllPermissions(query: GetAllPermissionsQuery): Promise<any> {
        return this.queryBus.execute(query);
    }
}
