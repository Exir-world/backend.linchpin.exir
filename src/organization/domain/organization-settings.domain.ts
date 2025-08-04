export class OrganizationSettingsDomain {
    constructor(
        public readonly organizationId: number,
        public readonly notifyAdminOnUserExit: boolean,
        public readonly registerUserExit: boolean,
    ) { }
}
