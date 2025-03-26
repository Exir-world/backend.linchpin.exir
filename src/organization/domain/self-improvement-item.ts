import { SelfImprovementItemTypeEnum } from "./enums/self-improvement-item-type.enum";

export class SelfImprovementItem {
    constructor(
        public id: number,
        public title: string,
        public type: SelfImprovementItemTypeEnum,
        // public score: number,
        public image: string,
        public color: string,
        public subItems: any[],
    ) { }
}
