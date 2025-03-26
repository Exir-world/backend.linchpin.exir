import { SelfImprovementItemTypeEnum } from "src/organization/domain/enums/self-improvement-item-type.enum";

export class CreateSelfImprovementCommand {
    constructor(
        public readonly organizationId: number,
        public readonly title: string,
        public readonly items: { title: string; type: SelfImprovementItemTypeEnum, image: string; color: string; }[],
        public readonly description?: string,
    ) { }
}
