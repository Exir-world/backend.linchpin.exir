import { OrganizationTimes } from "src/organization/domain/organization-times";

export interface OrganizationSharedPort {
    getTimesByOrgId(orgId: number): Promise<OrganizationTimes[]>;
    getTimeDurationByOrgId(orgId: number): Promise<{
        totalDuration: number,
        currentDuration: number,
        currentStartTime: string,
        currentEndTime: string,
        isWorkTime: boolean,
    }>;
}