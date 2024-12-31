import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddPermissionsToRoleCommand } from '../add-permissions-to-role.command';
import { RoleRepository } from '../../ports/role.repository';
import { PermissionRepository } from '../../ports/permission.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(AddPermissionsToRoleCommand)
export class AddPermissionsToRoleHandler
    implements ICommandHandler<AddPermissionsToRoleCommand> {
    constructor(
        private readonly roleRepository: RoleRepository,
        private readonly permissionRepository: PermissionRepository,
    ) { }

    async execute(command: AddPermissionsToRoleCommand): Promise<void> {
        const { roleId, permissions } = command;

        // Find the role by ID
        const roleInstance = await this.roleRepository.findById(roleId);
        if (!roleInstance) {
            throw new NotFoundException(`Role ${roleInstance} not found.`);
        }

        // Find or create the permissions
        const permissionList = await this.permissionRepository.findByIds(permissions);

        // Add permissions to the role
        roleInstance.permissions.push(...permissionList);

        // Save the updated role
        await this.roleRepository.save(roleInstance);
    }
}
