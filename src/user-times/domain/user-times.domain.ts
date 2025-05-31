import { WeeklyTimesDomain } from "./weekly-times.domain";

export class UserTimesDomain {
    constructor(
        public id: number,
        public userId: number,
        public createdAt: Date,
        public weeklyTimes: WeeklyTimesDomain[],
    ) { }
}
