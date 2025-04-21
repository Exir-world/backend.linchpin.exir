// src/property-feature/domain/property-feature.domain.ts

import { PropertyCategoryFeature } from "./property-category-feature.domain";
import { Property } from "./property.domain";

export class PropertyFeature {
    constructor(
        public readonly id: number,
        public readonly value: string,
        public readonly property: Property,
        public readonly feature: PropertyCategoryFeature,
    ) { }
}
