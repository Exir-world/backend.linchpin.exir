import { WorkReport } from "src/attendance/domain/work-report";

export abstract class WorkReportRepository {
    abstract save(workReport: WorkReport): Promise<void>;
    abstract findById(id: number): Promise<WorkReport | null>;
}
