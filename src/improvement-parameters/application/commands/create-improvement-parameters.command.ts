import { ImprovementTypeEnum } from "src/improvement-parameters/domain/enums/improvement-type.enum";

export class CreateImprovementParametersCommand {
    constructor(
        public readonly items: {
            title: string;
            type: ImprovementTypeEnum;
            image?: string;
            color?: string;
            score?: number[];
            children?: {
                title: string;
                type: ImprovementTypeEnum;
                image?: string;
                color?: string;
                score: number[];
            }[];
        }[],
    ) { }
}
