// src/attendance/application/queries/get-last-attendance.query.ts

export class GetDailyAttendanceStatusQuery {
    constructor(
        public readonly userId: number,
        public readonly totalDuration: number,
        public readonly currentDuration: number,
    ) { }
}
