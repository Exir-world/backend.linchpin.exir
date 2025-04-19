import { UserPropertyEntity } from "src/properties/infrastructure/entities/user-property.entity";

export abstract class UserPropertyRepository {
    abstract assign(userProperty: UserPropertyEntity[]): Promise<UserPropertyEntity[]>;
    abstract unassign(userId: number, propertyId: number): Promise<void>;
    abstract findByUserId(userId: number): Promise<UserPropertyEntity[]>;
}
