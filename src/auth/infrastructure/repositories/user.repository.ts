import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from 'src/auth/application/ports/user.repository';
import { User } from 'src/auth/domain/user';
import { RoleMapper } from '../mappers/role.mapper';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepositoryImpl extends UserRepository {
    private readonly ormRepository: Repository<UserEntity>;

    constructor(private readonly dataSource: DataSource) {
        super();
        this.ormRepository = this.dataSource.getRepository(UserEntity);
    }

    async findByCondition(condition: any, options: { take: number; skip: number }): Promise<any> {
        const [users, count] = await this.ormRepository.findAndCount({
            where: condition,
            relations: ['role'],
            take: options.take,
            skip: options.skip,
        });
        return [users.map(UserMapper.toDomain), count];
    }

    async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
        const userEntity = await this.ormRepository.findOne({ where: { phoneNumber }, relations: ['role'] });

        if (!userEntity) {
            return null;
        }

        return new User(
            userEntity.organizationId,
            userEntity.firstname,
            userEntity.name,
            userEntity.email,
            userEntity.profileImage,
            userEntity.lastname,
            userEntity.phoneNumber,
            userEntity.password,
            RoleMapper.toDomain(userEntity.role),
            userEntity.nationalCode,
            userEntity.personnelCode,
            userEntity.isDeleted,
            userEntity.hasAdminPanelAccess,
            userEntity.id,
        );
    }

    async save(user: User): Promise<User> {
        const newUser = await this.ormRepository.save(UserMapper.toEntity(user));
        return UserMapper.toDomain(newUser);
    }

    async findAll(): Promise<User[]> {
        const users = await this.ormRepository.find({ relations: ['role'] });
        return users.map(UserMapper.toDomain);
    }

    async findById(id: number): Promise<User | null> {
        const user = await this.ormRepository.findOne({ where: { id }, relations: ['role'] });
        return user ? UserMapper.toDomain(user) : null;
    }

    async delete(id: number): Promise<void> {
        await this.ormRepository.delete(id);
    }
}
