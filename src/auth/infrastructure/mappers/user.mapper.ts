// src/modules/auth/infrastructure/mappers/user.mapper.ts
import { User } from '../../domain/user';
import { UserEntity } from '../entities/user.entity';
import { RoleMapper } from './role.mapper';

export class UserMapper {
    static toDomain(userEntity: UserEntity): User {
        const role = RoleMapper.toDomain(userEntity.role);
        return new User(
            userEntity.teamId,
            userEntity.name,
            userEntity.profileImage,
            userEntity.lastname,
            userEntity.phoneNumber,
            userEntity.password,
            role,
            userEntity.id,
        );
    }

    static toEntity(user: User): UserEntity {
        const userEntity = new UserEntity();
        userEntity.id = user.id;
        userEntity.teamId = user.teamId;
        userEntity.name = user.name;
        userEntity.lastname = user.lastname;
        userEntity.phoneNumber = user.phoneNumber;
        userEntity.password = user.password;
        userEntity.role = RoleMapper.toEntity(user.role);
        return userEntity;
    }
}
