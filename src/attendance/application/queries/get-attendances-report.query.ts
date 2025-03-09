// src/attendance/application/queries/get-last-attendance.query.ts

export class GetAttendancesReportQuery {
    constructor(
        public readonly userId: number,
        public readonly startDate: string,
        public readonly endDate: string,
    ) { }
}
