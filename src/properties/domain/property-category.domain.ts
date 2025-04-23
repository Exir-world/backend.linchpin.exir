import { PropertyCategoryFeature } from "./property-category-feature.domain";

// src/property-category/domain/property-category.domain.ts
export class PropertyCategory {
    constructor(
        public id: number,
        public title?: string,
        public features?: PropertyCategoryFeature[],
    ) { }
}
