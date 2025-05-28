export class CreateUserImprovementParameterCommand {
    constructor(
        public userId: number,
        public improvementId: number,
        public userScore: number,
        public description: string,
    ) { }
}
