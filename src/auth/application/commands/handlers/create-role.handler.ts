// handlers/create-role.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoleCommand } from '../create-role.command';
import { RolesRepository } from 'src/auth/infrastructure/repositories/role.repository';
import { RoleEntity } from 'src/auth/infrastructure/entities/role.entity';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
  constructor(private readonly rolesRepository: RolesRepository) { }

  async execute(command: CreateRoleCommand): Promise<RoleEntity> {
    const { name, permissions, description } = command;
    const role = this.rolesRepository.create({
      name,
      permissions: (permissions || []) as any,
      description,
    });
    return this.rolesRepository.save(role);
  }
}
