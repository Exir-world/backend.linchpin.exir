// src/modules/auth/application/commands/handlers/create-role.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoleCommand } from '../create-role.command';
import { Role } from '../../../domain/role';
import { RoleRepository } from '../../ports/role.repository';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
    constructor(private readonly roleRepository: RoleRepository) { }

    async execute(command: CreateRoleCommand): Promise<void> {
        const role = new Role(command.name);
        await this.roleRepository.save(role);
    }
}
