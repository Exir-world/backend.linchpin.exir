export class GetAllPropertiesQuery {
    constructor(
        public readonly organizationId: number,
        public readonly departmentId: number,
        public readonly isAssigned: boolean,
    ) { }
}
