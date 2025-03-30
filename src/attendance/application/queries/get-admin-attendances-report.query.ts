// src/attendance/application/queries/get-last-attendance.query.ts

export class GetAdminAttendancesReportQuery {
    constructor(
        public readonly startDate: string,
        public readonly endDate: string,
        public readonly holidaysDayCount: number,
    ) { }
}
