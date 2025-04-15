import { Property } from "./property.domain";

export class UserProperty {
    constructor(
        public id: number,
        public userId: number,
        public propertyId: number,
        public property: Property,
        public deliveredAt: Date,
    ) { }
}