export class CreateUserSelfImprovementCommand {
    constructor(
        public userId: number,
        public improvementId: number,
        public userScore: number,
        public description: string,
    ) { }
}
