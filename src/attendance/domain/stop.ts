import { DateUtil } from "src/common/utils/date.util";

export class Stop {
    private readonly id: number;
    private readonly attendanceId: number;
    private startTime: Date;
    private endTime?: Date;
    private reason?: string;

    constructor(id: number, attendanceId: number, startTime: Date, endTime?: Date, reason?: string) {
        this.id = id;
        this.attendanceId = attendanceId;
        this.startTime = startTime;
        if (reason)
            this.reason = reason;
        if (endTime)
            this.endTime = endTime;
    }

    public endStop(): void {
        if (this.endTime) {
            throw new Error('Stop has already ended.');
        }
        this.endTime = DateUtil.nowUTC();
    }

    public get getId(): number {
        return this.id;
    }

    public get getAttendanceId(): number {
        return this.attendanceId;
    }

    public get getStartTime(): Date {
        return this.startTime;
    }

    public get getEndTime(): Date | undefined {
        return this.endTime;
    }

    public get getReason(): string {
        return this.reason;
    }
}
