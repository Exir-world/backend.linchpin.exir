import { Attendance } from "./attendance";

export class WorkReport {
    public id: number;
    public workReport: string;
    public accepted: boolean;
    public comment?: string;
    public acceptedBy?: number;
    public attendance?: Attendance;

    constructor(id: number, workReport: string, attendance?: Attendance) {
        this.id = id;
        this.attendance = attendance;
        this.workReport = workReport;
        this.accepted = false;
    }

    public accept(comment: string, acceptedBy: number): void {
        if (this.accepted) {
            throw new Error('Work report is already accepted.');
        }
        this.accepted = true;
        this.comment = comment;
        this.acceptedBy = acceptedBy;
    }

    public reject(comment: string, acceptedBy: number): void {
        if (this.accepted) {
            throw new Error('Accepted work reports cannot be rejected.');
        }
        this.comment = comment;
        this.acceptedBy = acceptedBy;
    }
}
