export class CreatePropertyReportCommand {
    constructor(
        public readonly userId: number,
        public readonly propertyId: number,
        public readonly report: string,
    ) { }
}
