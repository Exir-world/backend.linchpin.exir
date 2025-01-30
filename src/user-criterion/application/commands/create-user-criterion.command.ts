export class CreateUserCriteriaCommand {
    constructor(
        public readonly userId: number,
        public readonly criteria: {
            criterionId: number;
            userScore: boolean;
            date: Date;
        }[],
    ) { }
}
