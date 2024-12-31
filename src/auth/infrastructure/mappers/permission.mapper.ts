import { Permission } from '../../domain/permission';
import { PermissionEntity } from '../entities/permission.entity';

export class PermissionMapper {
    static toDomain(permissionEntity: PermissionEntity): Permission {
        return new Permission(permissionEntity.name, permissionEntity.id);
    }

    static toEntity(permission: Permission): PermissionEntity {
        const permissionEntity = new PermissionEntity();
        permissionEntity.id = permission.id;
        permissionEntity.name = permission.name;
        return permissionEntity;
    }
}
