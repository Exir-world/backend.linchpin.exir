export class CheckInCommand {
    constructor(
        public readonly userId: number,
        public readonly startOfDay: Date,
        public readonly startTime: string,
        public readonly lat?: number,
        public readonly lng?: number,
    ) { }
}
