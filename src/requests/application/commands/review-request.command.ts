export class ReviewRequestCommand {
    constructor(
        public requestId: number,
        public adminId: number,
        public action: 'APPROVE' | 'REJECT',
        public adminComment?: string
    ) { }
}
