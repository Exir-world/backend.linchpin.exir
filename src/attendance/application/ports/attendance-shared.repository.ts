import { Attendance } from "src/attendance/domain/attendance";

export interface AttendanceSharedRepository {
    manualCheckIn(
        userId: number,
        time: Date,
    ): Promise<void>;

    manualCheckOut(
        userId: number,
        time: Date,
    ): Promise<void>;

    findByUserIds(ids: number[], start: Date, end: Date): Promise<any[]>;
}