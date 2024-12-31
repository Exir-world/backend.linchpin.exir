import { Role } from '../../domain/role';

export abstract class RoleRepository {
    abstract save(role: Role): Promise<void>;
    abstract findAll(): Promise<Role[]>;
    abstract findById(id: number): Promise<Role | null>;
}
