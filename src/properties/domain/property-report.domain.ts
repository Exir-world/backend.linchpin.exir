import { PropertyReportStatusEnum } from "./enums/property-report-status.enum";
import { Property } from "./property.domain";

export class PropertyReport {
    constructor(
        public id: number,
        public userId: number,
        public propertyId: number,
        public property: Property,
        public report: string,
        public status: PropertyReportStatusEnum,
        public createdAt: Date,
    ) { }
}
