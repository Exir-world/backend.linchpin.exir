import { PropertyStatusEnum } from "./enums/property-status.enum";
import { PropertyCategory } from "./property-category.domain";

export class Property {
    constructor(
        public id: number,
        public code: string,
        public category: PropertyCategory,
        public status: PropertyStatusEnum,
        public createdAt: Date,
        public organizationId: number,
        public departmentId?: number,
        public brand?: string,
        public model?: string,
        public description?: string,
        public imageUrl?: string,
        public userProperties?: any[], // Replace with actual type if available
        public features?: any[], // Replace with actual type if available
    ) { }
}