import { Attendance } from "src/attendance/domain/attendance";

export abstract class AttendanceRepository {
    abstract save(attendance: Attendance | Attendance[]): Promise<void>;
    abstract findById(id: number): Promise<Attendance | null>;
    abstract findLastByUserId(userId: number): Promise<Attendance | null>;
    abstract findTodayAttendance(userId: number): Promise<Attendance[]>;
    abstract filterByUserAndRange(userId: number, startTime: Date, endTime: Date);
    abstract findCheckedInAttendances(): Promise<Attendance[]>;
}