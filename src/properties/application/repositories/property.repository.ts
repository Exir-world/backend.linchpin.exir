import { PropertyEntity } from "src/properties/infrastructure/entities/property.entity";

export abstract class PropertyRepository {
    abstract save(property: PropertyEntity): Promise<PropertyEntity>;
    abstract findAll(organizationId: number, departmentId: number): Promise<PropertyEntity[]>;
    abstract findById(id: number): Promise<PropertyEntity>;
    abstract update(id: number, data: Partial<PropertyEntity>): Promise<PropertyEntity>;
    abstract delete(id: number): Promise<void>;
}
