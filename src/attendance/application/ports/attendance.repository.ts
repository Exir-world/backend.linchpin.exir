import { Attendance } from "src/attendance/domain/attendance";

export abstract class AttendanceRepository {
    abstract save(attendances: Attendance[]): Promise<Attendance[]>;
    abstract findById(id: number): Promise<Attendance | null>;
    abstract findLastByUserId(userId: number): Promise<Attendance | null>;
    abstract findTodayAttendance(userId: number): Promise<Attendance[]>;
    abstract filterByUserAndRange(userId: number, startTime: Date, endTime: Date);
    abstract findCheckedInAttendances(userIds: number[]): Promise<Attendance[]>;
    abstract findByUserIds(ids: number[]): Promise<Attendance[]>
}