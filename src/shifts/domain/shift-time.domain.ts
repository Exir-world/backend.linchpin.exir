import { ShiftTimeTypeEnum } from "./enums/shift-time-type.enum";
import { Shift } from "./shift.domain";

export class ShiftTime {
    constructor(
        public readonly id: number,
        public readonly shift: Shift,
        public readonly startTime: string,
        public readonly endTime: string,
        public readonly type: ShiftTimeTypeEnum,
    ) { }

    static create(shift: Shift, startTime: string, endTime: string, type: ShiftTimeTypeEnum): ShiftTime {
        return new ShiftTime(null, shift, startTime, endTime, type);
    }
}
