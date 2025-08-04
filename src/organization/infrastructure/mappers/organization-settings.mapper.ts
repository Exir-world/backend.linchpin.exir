import { OrganizationSettingsDomain } from "src/organization/domain/organization-settings.domain";
import { OrganizationSettings } from "../entities/organization-settings.entity";

export class OrganizationSettingsMapper {
    static toDomain(entity: OrganizationSettings): OrganizationSettingsDomain {
        return new OrganizationSettingsDomain(
            entity.organization.id,
            entity.notifyAdminOnUserExit,
            entity.registerUserExit,
        );
    }

    static toPersistence(domain: OrganizationSettingsDomain): Partial<OrganizationSettings> {
        const entity = new OrganizationSettings();
        entity.organization = { id: domain.organizationId } as any; // assume organization is already loaded or just needs id
        entity.notifyAdminOnUserExit = domain.notifyAdminOnUserExit;
        entity.registerUserExit = domain.registerUserExit;
        return entity;
    }
}
