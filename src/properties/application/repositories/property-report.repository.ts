import { PropertyReportStatusEnum } from "src/properties/domain/enums/property-report-status.enum";
import { PropertyReportEntity } from "src/properties/infrastructure/entities/property-report.entity";

export abstract class PropertyReportRepository {
    abstract create(report: PropertyReportEntity): Promise<PropertyReportEntity>;
    abstract findAll(filters?: { code?: string; categoryId?: number; status?: PropertyReportStatusEnum }): Promise<PropertyReportEntity[]>;
    abstract findByPropertyId(propertyId: number): Promise<PropertyReportEntity[]>;
    abstract findNotGoodsByUserId(userId: number): Promise<PropertyReportEntity[]>;
    abstract findById(reportId: number): Promise<PropertyReportEntity>;
    abstract updateStatusById(reportId: number, status: PropertyReportStatusEnum): Promise<PropertyReportEntity>;
}
