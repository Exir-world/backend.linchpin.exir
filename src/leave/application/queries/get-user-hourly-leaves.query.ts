export class GetHourlyUserLeavesQuery {
    constructor(
        public readonly userId: number,
        public readonly startDate?: string,
        public readonly endDate?: string,
    ) { }
}
