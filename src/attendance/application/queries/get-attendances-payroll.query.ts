// src/attendance/application/queries/get-last-attendance.query.ts

export class GetAttendancesPayrollQuery {
    constructor(public readonly userIds: number[]) { }
}
