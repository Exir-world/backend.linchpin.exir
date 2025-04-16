export class UnassignPropertyCommand {
    constructor(
        public readonly userId: number,
        public readonly propertyId: number,
    ) { }
}
