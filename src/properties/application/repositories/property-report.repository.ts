import { PropertyReportEntity } from "src/properties/infrastructure/entities/property-report.entity";

export abstract class PropertyReportRepository {
    abstract create(report: PropertyReportEntity): Promise<PropertyReportEntity>;
    abstract findAll(): Promise<PropertyReportEntity[]>;
    abstract findByPropertyId(propertyId: number): Promise<PropertyReportEntity[]>;
}
