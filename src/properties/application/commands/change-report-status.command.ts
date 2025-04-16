import { PropertyReportStatusEnum } from "src/properties/domain/enums/property-report-status.enum";

export class ChangeReportStatusCommand {
    constructor(
        public readonly reportId: number,
        public readonly status: PropertyReportStatusEnum
    ) { }
}