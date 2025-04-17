import { PropertyStatusEnum } from "./enums/property-status.enum";

export class Property {
    constructor(
        public id: number,
        public title: string,
        public code: string,
        public status: PropertyStatusEnum,
        public createdAt: Date,
        public organizationId: number,
        public departmentId?: number,
        public imageUrl?: string,
        public userProperties?: any[], // Replace with actual type if available
    ) { }
}