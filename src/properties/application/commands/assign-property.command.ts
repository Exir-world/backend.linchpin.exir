export class AssignPropertyCommand {
    constructor(
        public readonly userId: number,
        public readonly propertyIds: number[],
    ) { }
}
