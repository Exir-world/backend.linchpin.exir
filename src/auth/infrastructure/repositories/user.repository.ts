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

    async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
        const userEntity = await this.ormRepository.findOne({ where: { phoneNumber }, relations: ['role'] });

        if (!userEntity) {
            return null;
        }

        return new User(
            userEntity.teamId,
            userEntity.name,
            userEntity.profileImage,
            userEntity.lastname,
            userEntity.phoneNumber,
            userEntity.password,
            RoleMapper.toDomain(userEntity.role),
            userEntity.id,
        );
    }

    async save(user: User): Promise<void> {
        await this.ormRepository.save(UserMapper.toEntity(user));
    }

    async findAll(): Promise<User[]> {
        const users = await this.ormRepository.find({ relations: ['role', 'role.permissions'] });
        return users.map(UserMapper.toDomain);
    }

    async findById(id: number): Promise<User | null> {
        const user = await this.ormRepository.findOne({ where: { id }, relations: ['role', 'role.permissions'] });
        return user ? UserMapper.toDomain(user) : null;
    }

    async delete(id: number): Promise<void> {
        await this.ormRepository.delete(id);
    }
}
