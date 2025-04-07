import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserEmploymentSettingsCommand } from '../update-user-employment-settings.command';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEmploymentSettingsEntity } from 'src/user-employment-settings/infrastructure/entities/user-employment-settings.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(UpdateUserEmploymentSettingsCommand)
export class UpdateUserEmploymentSettingsHandler implements ICommandHandler<UpdateUserEmploymentSettingsCommand> {
    constructor(
        @InjectRepository(UserEmploymentSettingsEntity)
        private readonly userEmploymentSettingsRepository: Repository<UserEmploymentSettingsEntity>
    ) { }

    async execute(command: UpdateUserEmploymentSettingsCommand): Promise<void> {
        const { userId, shiftId, salary, needLocation, teamId } = command;

        const settings = await this.userEmploymentSettingsRepository.findOne({ where: { userId } });
        if (!settings) {
            throw new BadRequestException(`Settings for user with ID ${userId} not found.`);
        }

        settings.shiftId = shiftId;
        settings.salary = salary;
        settings.needLocation = needLocation;
        settings.teamId = teamId;

        await this.userEmploymentSettingsRepository.save(settings);
    }
}
