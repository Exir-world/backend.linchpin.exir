export class CreateTeamCommand {
    constructor(
        public readonly creatorId: number,
        public readonly organizationId: number,
        public readonly title: string,
        public readonly supervisorId?: number,
        public readonly color?: string,
        public readonly description?: string,
    ) { }
}
