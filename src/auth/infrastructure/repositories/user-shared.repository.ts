import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserSharedRepository } from 'src/auth/application/ports/user-shared.repository';
import { UserDto } from 'src/shared/dto/user.dto';

@Injectable()
export class UserSharedRepositoryImpl implements UserSharedRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async getUserByIds(userIds: number[]): Promise<UserDto[]> {
        const users = await this.userRepository.find({ where: { id: In(userIds) } });

        return users.map(user => ({
            id: user.id,
            name: user.name,
            profileImage: user.profileImage,
        }));
    }

    async getUsersByOrgId(orgId: number): Promise<UserDto[]> {
        const users = await this.userRepository.find();

        return users.map(user => ({
            id: user.id,
            name: user.name,
        }));
    }

    async getAllUsers(): Promise<UserDto[]> {
        const users = await this.userRepository.find();
        return users.map(user => ({
            id: user.id,
            name: user.name,
        }));
    }

    async getUserById(userId: number): Promise<UserDto | null> {
        return await this.userRepository.findOne({ where: { id: userId }, select: ['id', 'name', 'phoneNumber', 'role'] });
    }
}
