import { PropertyCategoryFeature } from "src/properties/domain/property-category-feature.domain";

export abstract class PropertyCategoryFeatureRepository {
    abstract create(
        categoryId: number,
        title: string
    ): Promise<PropertyCategoryFeature>;

    abstract findAllByCategoryId(categoryId: number): Promise<PropertyCategoryFeature[]>;

    abstract findById(id: number): Promise<PropertyCategoryFeature>;

    abstract update(
        id: number,
        data: Partial<{ title: string }>
    ): Promise<PropertyCategoryFeature>;

    abstract delete(id: number): Promise<void>;

    abstract removeByIds(ids: number[]): Promise<void>;

    abstract saveArray(
        features: PropertyCategoryFeature[]
    ): Promise<PropertyCategoryFeature[]>;
}
