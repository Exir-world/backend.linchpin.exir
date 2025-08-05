export class UpsertUserLastLocationCommand {
    constructor(
        public readonly userId: number,
        public readonly lat: number,
        public readonly lng: number,
    ) { }
}
