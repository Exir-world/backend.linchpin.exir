// src/attendance/application/commands/submit-work-report.command.ts

export class SubmitWorkReportCommand {
    constructor(
        public readonly reportText: string,
        public readonly userId: number,
    ) { }
}
