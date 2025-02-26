export class CheckInCommand {
    constructor(
        public readonly userId: number,
        public readonly startOfDay: Date,
        public readonly lat?: number,
        public readonly lng?: number,
    ) { }
}
