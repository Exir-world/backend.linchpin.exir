import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePermissionCommand } from '../create-permission.command';
import { Permission } from '../../../domain/permission';
import { PermissionRepository } from '../../ports/permission.repository';

@CommandHandler(CreatePermissionCommand)
export class CreatePermissionHandler
    implements ICommandHandler<CreatePermissionCommand> {
    constructor(private readonly permissionRepository: PermissionRepository) { }

    async execute(command: CreatePermissionCommand): Promise<void> {
        const permission = new Permission(command.name);
        await this.permissionRepository.save(permission);
    }
}
