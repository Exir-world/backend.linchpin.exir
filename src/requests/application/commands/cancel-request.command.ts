export class CancelRequestCommand {
    constructor(
        public readonly requestId: number,
        public readonly userId: number
    ) { }
}