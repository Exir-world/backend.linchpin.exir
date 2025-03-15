export class GetPayslipByIdQuery {
    constructor(
        public readonly id: number,
        public readonly userId: number,
    ) { }
}
