import { Role } from '../../domain/role';
import { RoleEntity } from '../entities/role.entity';

export class RoleMapper {
    static toDomain(roleEntity: RoleEntity): Role {
        return new Role(
            roleEntity.name,
            roleEntity.permissions,
            roleEntity.id,
            roleEntity.description
        );
    }

    static toEntity(role: Role): RoleEntity {
        const roleEntity = new RoleEntity();
        roleEntity.id = role.id;
        roleEntity.name = role.name;
        roleEntity.permissions = role.permissions;
        roleEntity.description = role.description;
        return roleEntity;
    }
}
