import { PropertyCategoryFeature } from "./property-category-feature.domain";

// src/property-category/domain/property-category.domain.ts
export class PropertyCategory {
    constructor(
        public readonly id: number,
        public readonly title?: string,
        public readonly features?: PropertyCategoryFeature[],
    ) { }
}
