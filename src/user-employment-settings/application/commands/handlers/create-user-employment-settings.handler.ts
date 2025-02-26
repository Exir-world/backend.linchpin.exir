import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserEmploymentSettingsCommand } from "../create-user-employment-settings.command";
import { UserEmploymentSettingsEntity } from "src/user-employment-settings/infrastructure/entities/user-employment-settings.entity";
import { UserEmploymentSettings } from "src/user-employment-settings/domain/user-employment-settings.domain";
import { UserEmploymentSettingsMapper } from "src/user-employment-settings/infrastructure/mappers/user-employment-settings.mapper";

@CommandHandler(CreateUserEmploymentSettingsCommand)
export class CreateUserEmploymentSettingsHandler implements ICommandHandler<CreateUserEmploymentSettingsCommand> {
    constructor(
        @InjectRepository(UserEmploymentSettingsEntity)
        private readonly userEmploymentSettingsRepository: Repository<UserEmploymentSettingsEntity>
    ) { }

    async execute(command: CreateUserEmploymentSettingsCommand): Promise<UserEmploymentSettings> {
        const { userId, shiftId, salaryCoef, needLocation } = command;

        const entity = this.userEmploymentSettingsRepository.create({
            userId,
            shiftId,
            salaryCoef,
            needLocation,
        });

        const settings = await this.userEmploymentSettingsRepository.save(entity);
        return UserEmploymentSettingsMapper.toDomain(settings);
    }
}
