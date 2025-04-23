export class UpdatePropertyCategoryCommand {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly features: { id?: number; title: string }[]
    ) { }
}