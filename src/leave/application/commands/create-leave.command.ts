import { LeaveTypeEnum } from "src/leave/domain/enums/leave-type.enum";

export class CreateLeaveCommand {
    constructor(
        public readonly userId: number,
        public readonly type: LeaveTypeEnum,
        public readonly description: string | null,
        public readonly startTime: Date,
        public readonly endTime: Date,
    ) { }
}
