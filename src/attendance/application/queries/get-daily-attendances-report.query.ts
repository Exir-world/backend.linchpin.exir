// src/attendance/application/queries/get-last-attendance.query.ts

export class GetDailyAttendancesReportQuery {
    constructor(
        public readonly userId: number,
        public readonly date: string,
    ) { }
}
