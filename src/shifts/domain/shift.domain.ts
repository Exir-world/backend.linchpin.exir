import { ShiftTime } from "./shift-time.domain";

export class Shift {
    constructor(
        public readonly id: number,
        public readonly organizationId: number,
        public readonly title: string,
        public readonly shiftTimes: ShiftTime[],
    ) { }

    static create(organizationId: number, title: string, shiftTimes): Shift {
        return new Shift(null, organizationId, title, shiftTimes);
    }
}
