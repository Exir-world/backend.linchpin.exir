import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRoleCommand } from '../update-role.command';
import { RolesRepository } from 'src/auth/infrastructure/repositories/role.repository';
import { RoleEntity } from 'src/auth/infrastructure/entities/role.entity';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
  constructor(private readonly rolesRepository: RolesRepository) { }

  async execute(command: UpdateRoleCommand): Promise<RoleEntity> {
    const { id, name, permissions, description } = command;
    await this.rolesRepository.update(id, {
      name: name || undefined,
      permissions,
      description,
    });
    return this.rolesRepository.findOne({ where: { id } });
  }
}
