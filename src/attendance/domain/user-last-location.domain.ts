export class UserLastLocationDomain {
    constructor(
        public readonly userId: number,
        public readonly lat: number,
        public readonly lng: number,
        public readonly lastVisitedAt: Date,
    ) { }
}
