import { Permission } from 'src/auth/domain/permission';

export abstract class PermissionRepository {
    abstract save(permission: Permission): Promise<void>;
    abstract findAll(): Promise<Permission[]>;
    abstract findByIds(ids: number[]): Promise<Permission[] | null>;
}
