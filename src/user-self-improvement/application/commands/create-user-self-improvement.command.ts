export class CreateUserSelfImprovementCommand {
    constructor(
        public readonly userId: number,
        public readonly items: {
            improvementId: number;
            userScore: number;
            date: Date;
        }[],
    ) { }
}
