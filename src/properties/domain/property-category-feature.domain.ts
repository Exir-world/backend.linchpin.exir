// src/property-category-feature/domain/property-category-feature.domain.ts

import { PropertyCategory } from "./property-category.domain";

export class PropertyCategoryFeature {
    constructor(
        public id: number,
        public title: string,
        public category: PropertyCategory,
    ) { }
}
