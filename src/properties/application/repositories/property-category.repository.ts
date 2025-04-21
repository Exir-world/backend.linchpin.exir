import { PropertyCategory } from "src/properties/domain/property-category.domain";

export abstract class PropertyCategoryRepository {
    abstract create(
        title: string,
        features?: string[]
    ): Promise<PropertyCategory>;

    abstract findAll(): Promise<PropertyCategory[]>;

    abstract findById(id: number): Promise<PropertyCategory>;

    abstract update(
        id: number,
        data: Partial<{ title: string }>
    ): Promise<PropertyCategory>;

    abstract delete(id: number): Promise<void>;
}
