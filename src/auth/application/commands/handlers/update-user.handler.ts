import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../update-user.command';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/infrastructure/entities/user.entity';
import { UserEmploymentSettingsSharedPort } from 'src/user-employment-settings/application/ports/user-employment-settings-shared.port';
import { Inject } from '@nestjs/common';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @Inject('UserEmploymentSettingsSharedPort')
        private readonly userEmploymentSettingsSharedPort: UserEmploymentSettingsSharedPort,
    ) { }

    async execute(command: UpdateUserCommand): Promise<UserEntity | null> {
        const { userId, adminId, dto } = command;
        const { settings, ...restDto } = dto; // Remove settings key from dto
        const updateData = {
            ...restDto,
            role: restDto.role ? { id: restDto.role } : undefined, // Map role to the expected type
        };
        await this.userRepository.update({ id: userId }, updateData);

        if (dto.settings) {
            await this.userEmploymentSettingsSharedPort.updateSettings(
                userId,
                {
                    shiftId: dto.settings.shiftId,
                    teamId: dto.settings.teamId,
                    needLocation: dto.settings.needToLocation,
                    salary: dto.settings.salary,
                });
        }

        return this.userRepository.findOne({ where: { id: userId } });
    }
}
