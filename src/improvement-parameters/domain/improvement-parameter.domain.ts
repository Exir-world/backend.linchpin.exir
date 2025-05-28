import { ImprovementTypeEnum } from "./enums/improvement-type.enum";

export class ImprovementParameter {
    constructor(
        public readonly id: number,
        public title: string,
        public type: ImprovementTypeEnum,
        public image: string | null,
        public color: string | null,
        public score: number[],
        public parentId?: number,
    ) { }
}