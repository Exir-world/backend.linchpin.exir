export class CheckInCommand {
    constructor(
        public readonly userId: number,
        public readonly startOfDay: Date,
    ) { }
}
