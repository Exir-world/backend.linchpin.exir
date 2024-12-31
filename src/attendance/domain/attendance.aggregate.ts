import { Attendance } from "./attendance";
import { WorkReport } from "./work-report";

export class AttendanceAggregate {
    private _attendance: Attendance;
    private _workReport?: WorkReport;

    constructor(attendance: Attendance) {
        this._attendance = attendance;
    }

    public attachWorkReport(workReport: WorkReport): void {
        if (this._workReport) {
            throw new Error('Work report is already attached.');
        }
        this._workReport = workReport;
        this._attendance.attachWorkReport(workReport);
    }

    public approveWorkReport(acceptedBy: number, comment: string): void {
        if (!this._workReport) {
            throw new Error('No work report to approve.');
        }
        this._workReport.accept(comment, acceptedBy);
    }

    public rejectWorkReport(acceptedBy: number, comment: string): void {
        if (!this._workReport) {
            throw new Error('No work report to reject.');
        }
        this._workReport.reject(comment, acceptedBy);
    }

    public get attendance(): Attendance {
        return this._attendance;
    }

    public get workReport(): WorkReport | undefined {
        return this._workReport;
    }
}
