import { Attendance } from "src/attendance/domain/attendance";

export abstract class AttendanceRepository {
    abstract save(attendances: Attendance[]): Promise<void>;
    abstract findById(id: number): Promise<Attendance | null>;
    abstract findLastByUserId(userId: number): Promise<Attendance | null>;
    abstract findTodayAttendance(userId: number): Promise<Attendance[]>;
    abstract filterByUserAndRange(userId: number, startTime: Date, endTime: Date);
    abstract findCheckedInAttendances(startTime: Date): Promise<Attendance[]>;
    abstract findByUserIds(ids: number[]): Promise<Attendance[]>
}