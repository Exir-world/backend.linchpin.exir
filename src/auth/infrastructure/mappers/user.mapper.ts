// src/modules/auth/infrastructure/mappers/user.mapper.ts
import { User } from '../../domain/user';
import { UserEntity } from '../entities/user.entity';
import { RoleMapper } from './role.mapper';

export class UserMapper {
    static toDomain(userEntity: UserEntity): User {
        const role = RoleMapper.toDomain(userEntity.role);
        return new User(
            userEntity.name,
            userEntity.phoneNumber,
            userEntity.password,
            role,
            userEntity.id,
        );
    }

    static toEntity(user: User): UserEntity {
        const userEntity = new UserEntity();
        userEntity.id = user.id;
        userEntity.name = user.name;
        userEntity.phoneNumber = user.phoneNumber;
        userEntity.password = user.password;
        userEntity.role = RoleMapper.toEntity(user.role);
        return userEntity;
    }
}
