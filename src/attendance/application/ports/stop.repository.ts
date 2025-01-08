import { Stop } from "src/attendance/domain/stop";

export abstract class StopRepository {
    abstract createStop(attendanceId: number, reason: string): Promise<Stop>;
    abstract endStop(userId: number): Promise<Stop>;
}
