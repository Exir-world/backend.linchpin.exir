// src/modules/auth/infrastructure/mappers/role.mapper.ts
import { Role } from '../../domain/role';
import { RoleEntity } from '../entities/role.entity';
import { PermissionMapper } from './permission.mapper';

export class RoleMapper {
    static toDomain(roleEntity: RoleEntity): Role {
        const permissions = roleEntity.permissions?.map(PermissionMapper.toDomain);
        return new Role(roleEntity.name, permissions, roleEntity.id);
    }

    static toEntity(role: Role): RoleEntity {
        const roleEntity = new RoleEntity();
        roleEntity.id = role.id;
        roleEntity.name = role.name;
        roleEntity.permissions = role.permissions?.map(PermissionMapper.toEntity);
        return roleEntity;
    }
}
