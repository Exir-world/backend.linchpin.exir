export class UpdateOrganizationCommand {
    constructor(
        public readonly dto: any, // Replace `any` with the appropriate DTO type if available
        public readonly adminId: number,
        public readonly organizationId: number,
    ) { }
}
