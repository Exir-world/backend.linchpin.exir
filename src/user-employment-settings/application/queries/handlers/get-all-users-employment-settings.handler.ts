import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { UserEmploymentSettingsEntity } from "src/user-employment-settings/infrastructure/entities/user-employment-settings.entity";
import { UserEmploymentSettings } from "src/user-employment-settings/domain/user-employment-settings.domain";
import { UserEmploymentSettingsMapper } from "src/user-employment-settings/infrastructure/mappers/user-employment-settings.mapper";
import { GetAllUsersEmploymentSettingsQuery } from "../get-all-users-employment-settings.query";

@QueryHandler(GetAllUsersEmploymentSettingsQuery)
export class GetAllUsersEmploymentSettingsHandler implements IQueryHandler<GetAllUsersEmploymentSettingsQuery> {
    constructor(
        @InjectRepository(UserEmploymentSettingsEntity)
        private readonly userEmploymentSettingsRepository: Repository<UserEmploymentSettingsEntity>
    ) { }

    async execute(_: GetAllUsersEmploymentSettingsQuery): Promise<UserEmploymentSettings[]> {
        const settings = await this.userEmploymentSettingsRepository.find({});

        return settings.map(s => UserEmploymentSettingsMapper.toDomain(s));
    }
}
