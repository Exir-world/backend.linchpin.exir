import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { UserEmploymentSettingsEntity } from "src/user-employment-settings/infrastructure/entities/user-employment-settings.entity";
import { UserEmploymentSettings } from "src/user-employment-settings/domain/user-employment-settings.domain";
import { UserEmploymentSettingsMapper } from "src/user-employment-settings/infrastructure/mappers/user-employment-settings.mapper";
import { NotFoundException } from "@nestjs/common";
import { GetUsersEmploymentSettingsQuery } from "../get-users-employment-settings.query";

@QueryHandler(GetUsersEmploymentSettingsQuery)
export class GetUsersEmploymentSettingsHandler implements IQueryHandler<GetUsersEmploymentSettingsQuery> {
    constructor(
        @InjectRepository(UserEmploymentSettingsEntity)
        private readonly userEmploymentSettingsRepository: Repository<UserEmploymentSettingsEntity>
    ) { }

    async execute(query: GetUsersEmploymentSettingsQuery): Promise<UserEmploymentSettings[]> {
        const settings = await this.userEmploymentSettingsRepository.find({
            where: { userId: In(query.userIds) }
        });

        return settings.map(s => UserEmploymentSettingsMapper.toDomain(s));
    }
}
