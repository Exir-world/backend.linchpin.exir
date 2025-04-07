import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../create-user.command';
import { UserRepository } from '../../ports/user.repository';
import { User } from 'src/auth/domain/user';
import { RoleRepository } from '../../ports/role.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { UserEmploymentSettingsSharedPort } from 'src/user-employment-settings/application/ports/user-employment-settings-shared.port';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository,
        @Inject('UserEmploymentSettingsSharedPort')
        private readonly userEmploymentSettingsSharedPort: UserEmploymentSettingsSharedPort,
    ) { }

    async execute(command: CreateUserCommand): Promise<User> {
        const role = await this.roleRepository.findById(command.role);
        if (!role) {
            throw new NotFoundException(`Role with ID ${command.role} not found.`);
        }

        const user = new User(
            command.organizationId,
            command.firstname,
            command.name,
            command.profileImage,
            command.lastname,
            command.phoneNumber,
            command.password,
            role,
            command.nationalCode,
            command.personnelCode,
            0
        );
        const newUser = await this.userRepository.save(user);

        if (command.settings) {
            await this.userEmploymentSettingsSharedPort.createSettings(
                newUser.id,
                command.settings.shiftId,
                command.settings.teamId,
                command.settings.needToLocation,
                command.settings.salary
            );
        }

        return newUser;
    }
}
