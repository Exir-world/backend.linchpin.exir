export class UpdatePropertyCategoryCommand {
    constructor(
        public readonly id: number,
        public readonly title: string,
    ) { }
}