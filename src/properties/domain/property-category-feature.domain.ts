// src/property-category-feature/domain/property-category-feature.domain.ts

import { PropertyCategory } from "./property-category.domain";

export class PropertyCategoryFeature {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly category: PropertyCategory,
    ) { }
}
