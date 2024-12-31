import { LeaveTypeEnum } from "./enums/leave-type.enum";

export class Leave {
    constructor(
        public readonly id: number,
        public readonly type: LeaveTypeEnum,
        public readonly userId: number,
        public readonly description: string | null,
        public readonly startTime: Date,
        public readonly endTime: Date,
        public readonly createdAt: Date,
    ) { }

    /**
     * بررسی می‌کند که زمان پایان بعد از زمان شروع باشد.
     */
    validateTimeRange(): boolean {
        return this.startTime < this.endTime;
    }

    /**
     * بررسی می‌کند که توضیحات مرخصی وجود داشته باشد.
     */
    hasDescription(): boolean {
        return !!this.description;
    }
}
