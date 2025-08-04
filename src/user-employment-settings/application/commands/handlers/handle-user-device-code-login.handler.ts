import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { HandleUserDeviceCodeLoginCommand } from '../handle-user-device-code-login.command';
import { UserEmploymentSettingsEntity } from 'src/user-employment-settings/infrastructure/entities/user-employment-settings.entity';

@CommandHandler(HandleUserDeviceCodeLoginCommand)
export class HandleUserDeviceCodeLoginHandler implements ICommandHandler<HandleUserDeviceCodeLoginCommand> {
    constructor(
        @InjectRepository(UserEmploymentSettingsEntity)
        private readonly settingsRepo: Repository<UserEmploymentSettingsEntity>,
    ) { }

    async execute(query: HandleUserDeviceCodeLoginCommand): Promise<void> {
        const { userId, deviceUniqueCode } = query;

        let settings = await this.settingsRepo.findOne({ where: { userId } });

        if (!settings.deviceUniqueCode) {
            settings.deviceUniqueCode = deviceUniqueCode;
            await this.settingsRepo.save(settings);
            return;
        }

        if (settings.deviceUniqueCode !== deviceUniqueCode) {
            throw new BadRequestException('ورود با دستگاه دیگر مجاز نیست.');
        }

        return;
    }
}
