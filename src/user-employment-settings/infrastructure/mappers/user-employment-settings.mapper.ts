import { UserEmploymentSettings } from "src/user-employment-settings/domain/user-employment-settings.domain";
import { UserEmploymentSettingsEntity } from "../entities/user-employment-settings.entity";

export class UserEmploymentSettingsMapper {
    static toDomain(entity: UserEmploymentSettingsEntity): UserEmploymentSettings {
        return new UserEmploymentSettings(entity.id, entity.userId, entity.shiftId, entity.salaryCoef, entity.needLocation);
    }

    static toEntity(domain: UserEmploymentSettings): UserEmploymentSettingsEntity {
        const entity = new UserEmploymentSettingsEntity();
        entity.id = domain.id;
        entity.userId = domain.userId;
        entity.shiftId = domain.shiftId;
        entity.salaryCoef = domain.salaryCoef;
        entity.needLocation = domain.needLocation;
        return entity;
    }
}
