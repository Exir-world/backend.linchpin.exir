export class CreatePropertyCategoryFeatureCommand {
    constructor(
        public readonly title: string,
        public readonly categoryId: number,
    ) { }
}