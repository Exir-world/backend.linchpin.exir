import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetUserEmploymentSettingsQuery } from "../get-user-employment-settings.query";
import { UserEmploymentSettingsEntity } from "src/user-employment-settings/infrastructure/entities/user-employment-settings.entity";
import { UserEmploymentSettings } from "src/user-employment-settings/domain/user-employment-settings.domain";
import { UserEmploymentSettingsMapper } from "src/user-employment-settings/infrastructure/mappers/user-employment-settings.mapper";
import { NotFoundException } from "@nestjs/common";

@QueryHandler(GetUserEmploymentSettingsQuery)
export class GetUserEmploymentSettingsHandler implements IQueryHandler<GetUserEmploymentSettingsQuery> {
    constructor(
        @InjectRepository(UserEmploymentSettingsEntity)
        private readonly userEmploymentSettingsRepository: Repository<UserEmploymentSettingsEntity>
    ) { }

    async execute(query: GetUserEmploymentSettingsQuery): Promise<UserEmploymentSettings> {
        const settings = await this.userEmploymentSettingsRepository.findOne({
            where: { userId: query.userId }
        });

        if (!settings)
            throw new NotFoundException('Settings not found!');

        return UserEmploymentSettingsMapper.toDomain(settings);
    }
}
