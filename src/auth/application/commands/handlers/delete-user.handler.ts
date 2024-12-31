import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../delete-user.command';
import { UserRepository } from '../../ports/user.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(command: DeleteUserCommand): Promise<void> {
        const user = await this.userRepository.findById(command.id);
        if (!user) {
            throw new NotFoundException(`User with ID ${command.id} not found`);
        }

        await this.userRepository.delete(command.id);
    }
}
