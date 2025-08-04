export class WeeklyTimesDomain {
    constructor(
        public id: number,
        public dayOfWeek: number,
        public startTime: string,
        public endTime: string,
        public isAbsent: boolean,
    ) { }
}
