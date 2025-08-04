import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRoleCommand } from '../delete-role.command';
import { RolesRepository } from 'src/auth/infrastructure/repositories/role.repository';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand> {
  constructor(private readonly rolesRepository: RolesRepository) { }

  async execute(command: DeleteRoleCommand): Promise<void> {
    const { id } = command;
    await this.rolesRepository.delete(id);
  }
}
