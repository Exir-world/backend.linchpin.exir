import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { RemoveDeviceUniqueCodeByUserIdCommand } from '../remove-device-unique-code.command';
import { Repository } from 'typeorm';
import { UserEmploymentSettingsEntity } from 'src/user-employment-settings/infrastructure/entities/user-employment-settings.entity';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(RemoveDeviceUniqueCodeByUserIdCommand)
export class RemoveDeviceUniqueCodeByUserIdHandler implements ICommandHandler<RemoveDeviceUniqueCodeByUserIdCommand> {
    constructor(
        @InjectRepository(UserEmploymentSettingsEntity)
        private readonly userEmploymentSettingsRepository: Repository<UserEmploymentSettingsEntity>
    ) { }

    async execute(command: RemoveDeviceUniqueCodeByUserIdCommand): Promise<void> {
        const { userId } = command;

        const settings = await this.userEmploymentSettingsRepository.findOne({ where: { userId } });
        if (!settings) {
            throw new NotFoundException(`User employment settings not found for userId: ${userId}`);
        }

        settings.deviceUniqueCode = null;

        await this.userEmploymentSettingsRepository.save(settings);
    }
}