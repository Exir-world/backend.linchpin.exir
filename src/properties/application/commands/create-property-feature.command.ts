export class CreatePropertyFeatureCommand {
    constructor(
        public readonly propertyId: number,
        public readonly featureId: number,
        public readonly value: string,
    ) { }
}