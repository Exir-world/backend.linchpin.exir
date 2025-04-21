import { PropertyFeature } from "src/properties/domain/property-feature.domain";

export abstract class PropertyFeatureRepository {
    abstract addFeatureToProperty(propertyId: number, featureId: number, value: string): Promise<PropertyFeature>;
    abstract addFeatureToProperties(propertyId: number, features: { id: number, value: string }[]): Promise<PropertyFeature[]>;

    abstract removeFeatureFromProperty(id: number): Promise<void>;

    abstract findAllByPropertyId(propertyId: number): Promise<PropertyFeature[]>;
}
