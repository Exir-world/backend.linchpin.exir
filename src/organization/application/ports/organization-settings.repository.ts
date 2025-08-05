import { OrganizationSettingsDomain } from '../../domain/organization-settings.domain';

export abstract class OrganizationSettingsRepositoryPort {
    abstract findByOrganizationId(orgId: number): Promise<OrganizationSettingsDomain | null>;
    abstract findAll(): Promise<OrganizationSettingsDomain[]>;
}
