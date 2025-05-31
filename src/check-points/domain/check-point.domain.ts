import { CheckPointItem } from "./check-point-item.domain";

export class CheckPoint {
    constructor(
        public readonly id: number,
        public readonly organizationId: number,
        public title: string,
        public readonly createdAt: Date,
        public isActive: boolean,
        public readonly items: CheckPointItem[] = [],
    ) { }
}
