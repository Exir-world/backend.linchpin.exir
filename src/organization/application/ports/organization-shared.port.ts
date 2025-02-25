export interface OrganizationSharedPort {
    getSelfImprovementsByOrgId(orgId: number): Promise<any>;
    getTeamsByOrgId(orgId: number): Promise<any>;
    getLocationByOrgId(orgId: number): Promise<any>;
}