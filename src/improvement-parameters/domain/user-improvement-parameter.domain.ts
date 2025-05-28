import { ImprovementParameter } from "./improvement-parameter.domain";

export class UserImprovementParameter {
    constructor(
        public readonly id: number,
        public readonly userId: number,
        public readonly improvementParameter: ImprovementParameter,
        public readonly userScore: number,
        public readonly supervisorScore: number | null,
        public readonly date: Date,
        public readonly description: string | null,
    ) { }
}