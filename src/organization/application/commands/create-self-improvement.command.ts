export class CreateSelfImprovementCommand {
    constructor(
        public readonly organizationId: number,
        public readonly title: string,
        public readonly items: { title: string; score: number, image: string; color: string; }[],
        public readonly description?: string,
    ) { }
}
