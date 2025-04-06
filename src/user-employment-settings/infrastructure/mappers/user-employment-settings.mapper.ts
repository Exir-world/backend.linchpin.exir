import { UserEmploymentSettings } from "src/user-employment-settings/domain/user-employment-settings.domain";
import { UserEmploymentSettingsEntity } from "../entities/user-employment-settings.entity";

export class UserEmploymentSettingsMapper {
    static toDomain(entity: UserEmploymentSettingsEntity): UserEmploymentSettings {
        return new UserEmploymentSettings(entity.id, entity.userId, entity.shiftId, entity.salary, entity.needLocation, entity.teamId);
    }

    static toEntity(domain: UserEmploymentSettings): UserEmploymentSettingsEntity {
        const entity = new UserEmploymentSettingsEntity();
        entity.id = domain.id;
        entity.userId = domain.userId;
        entity.shiftId = domain.shiftId;
        entity.salary = domain.salary;
        entity.needLocation = domain.needLocation;
        entity.teamId = domain.teamId ?? null;
        return entity;
    }
}
