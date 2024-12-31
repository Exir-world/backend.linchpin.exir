import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../update-user.command';
import { UserRepository } from '../../ports/user.repository';
import { NotFoundException } from '@nestjs/common';
import { RoleRepository } from '../../ports/role.repository';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository,
    ) { }

    async execute(command: UpdateUserCommand): Promise<void> {
        const user = await this.userRepository.findById(command.id);
        if (!user) {
            throw new NotFoundException(`User with ID ${command.id} not found`);
        }

        if (command.name) user.name = command.name;
        if (command.phoneNumber) user.phoneNumber = command.phoneNumber;
        if (command.password) user.password = command.password;
        if (command.role) {
            const role = await this.roleRepository.findById(command.role);
            if (!role) {
                throw new NotFoundException(`Role '${command.role}' not found`);
            }
            user.role = role; // Assign Role Domain Object
        }

        await this.userRepository.save(user);
    }
}
