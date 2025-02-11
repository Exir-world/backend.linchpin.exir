import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../create-user.command';
import { UserRepository } from '../../ports/user.repository';
import { User } from 'src/auth/domain/user';
import { Role } from 'src/auth/domain/role';
import { RoleRepository } from '../../ports/role.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository,
    ) { }

    async execute(command: CreateUserCommand): Promise<void> {
        const role = await this.roleRepository.findById(command.role);
        if (!role) {
            throw new NotFoundException(`Role with ID ${command.role} not found.`);
        }

        const user = new User(
            command.teamId,
            command.name,
            command.profileImage,
            command.lastname,
            command.phoneNumber,
            command.password,
            role,
            0
        );
        await this.userRepository.save(user);
    }
}
