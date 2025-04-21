export class CreatePropertyCategoryCommand {
    constructor(
        public readonly title: string,
        public readonly features?: { title: string }[],
    ) { }
}