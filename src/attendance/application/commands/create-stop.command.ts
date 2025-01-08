export class CreateStopCommand {
    constructor(
        public readonly userId: number,
        public readonly reason: string,
    ) { }
}
