export class GetAllUsersQuery {
    constructor(
        public readonly organizationId: number,
        public readonly query?: {
            departmentId?: number;
            teamId?: number;
            personnelCode?: string;
            nationalCode?: string;
            phoneNumber?: string;
            name?: string;
            page?: number;
            limit?: number;
        },
    ) { }
}
