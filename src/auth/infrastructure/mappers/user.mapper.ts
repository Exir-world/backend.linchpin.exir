// src/modules/auth/infrastructure/mappers/user.mapper.ts
import { User } from '../../domain/user';
import { UserEntity } from '../entities/user.entity';
import { RoleMapper } from './role.mapper';

export class UserMapper {
    static toDomain(userEntity: UserEntity): User {
        const role = RoleMapper.toDomain(userEntity.role);
        return new User(
            userEntity.organizationId,
            userEntity.firstname,
            userEntity.name,
            userEntity.profileImage,
            userEntity.lastname,
            userEntity.phoneNumber,
            userEntity.password,
            role,
            userEntity.nationalCode,
            userEntity.personnelCode,
            userEntity.isDeleted,
            userEntity.hasAdminPanelAccess,
            userEntity.id,
        );
    }

    static toEntity(user: User): UserEntity {
        const userEntity = new UserEntity();
        userEntity.id = user.id;
        userEntity.organizationId = user.organizationId;
        userEntity.firstname = user.firstname;
        userEntity.name = user.name;
        userEntity.lastname = user.lastname;
        userEntity.phoneNumber = user.phoneNumber;
        userEntity.password = user.password;
        userEntity.role = RoleMapper.toEntity(user.role);
        userEntity.nationalCode = user.nationalCode;
        userEntity.personnelCode = user.personnelCode;
        userEntity.isDeleted = user.isDeleted;
        userEntity.profileImage = user.profileImage;
        userEntity.hasAdminPanelAccess = user.hasAdminPanelAccess;
        return userEntity;
    }
}
