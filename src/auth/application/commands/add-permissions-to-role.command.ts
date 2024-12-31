export class AddPermissionsToRoleCommand {
    constructor(
        public readonly roleId: number,
        public readonly permissions: number[],
    ) { }
}
