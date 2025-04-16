// src/attendance/application/queries/get-last-attendance.query.ts

export class FilterAttendancesByAdminQuery {
    constructor(
        public readonly userId: number,
        public readonly startDate: Date,
        public readonly endDate: Date,
    ) { }
}
