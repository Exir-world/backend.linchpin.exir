import { PropertyReportStatusEnum } from "src/properties/domain/enums/property-report-status.enum";

export class GetAllReportsQuery {
    constructor(
        public readonly code: string,
        public readonly categoryId: number,
        public readonly status: PropertyReportStatusEnum
    ) { }
}
