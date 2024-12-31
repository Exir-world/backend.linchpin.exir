export class ApproveWorkReportCommand {
    constructor(
        public readonly workReportId: number,
        public readonly accepted: boolean,
        public readonly comment: string,
        public readonly acceptedBy: number,
    ) { }
}
