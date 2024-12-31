export class CreateStopCommand {
    constructor(
        public readonly attendanceId: number,
        public readonly reason: string,
    ) { }
}
