// src/attendance/application/queries/get-last-attendance.query.ts

export class GetMonthlyReportQuery {
    constructor(
        public readonly userId: number,
        public readonly monthAgo: number,
        public readonly totalDuration: number,
    ) { }
}
