export interface OrganizationSharedPort {
    getSelfImprovementsSubItemsId(itemId: number): Promise<any>;
    getSelfImprovementsByOrgId(orgId: number): Promise<any>;
    getTeamsByOrgId(orgId: number): Promise<any>;
    getLocationByOrgId(orgId: number): Promise<any>;
    getOrganizationsByAdminId(adminId: number): Promise<any>;
}