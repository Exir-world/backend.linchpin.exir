import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserSharedRepository } from 'src/auth/application/ports/user-shared.repository';
import { UserDto } from 'src/shared/dto/user.dto';
import { Permission } from 'src/auth/domain/enums/permission.enum';

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
            phoneNumber: user.phoneNumber,
            firstname: user.firstname,
            lastname: user.lastname,
            personnelCode: user.personnelCode,
            profileImage: user.profileImage,
        }));
    }

    async getUsersByOrgId(orgId: number): Promise<UserDto[]> {
        const users = await this.userRepository.find();

        return users.map(user => ({
            id: user.id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            firstname: user.firstname,
            lastname: user.lastname,
            personnelCode: user.personnelCode,
            profileImage: user.profileImage,
        }));
    }

    async getAllUsers(): Promise<UserDto[]> {
        const users = await this.userRepository.find();
        return users.map(user => ({
            id: user.id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            firstname: user.firstname,
            lastname: user.lastname,
            personnelCode: user.personnelCode,
            profileImage: user.profileImage,
            organizationId: user.organizationId,
        }));
    }

    async getAdmins(permissions: Permission[] = []): Promise<number[]> {
        const whereCondition: any = {
            hasAdminPanelAccess: true,
        };

        const users = await this.userRepository.find({
            where: whereCondition,
            relations: ['role']
        });

        // if (permissions.length > 0) {
        //     whereCondition.role = {
        //         permissions: In(permissions)
        //     };
        // }
        return users
            .filter(user =>
                permissions.length > 0 &&
                permissions.every(permission => user.role.permissions.includes(permission))
            )
            .map(user => user.id);
    }

    async getUserById(userId: number): Promise<UserDto | null> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: [
                'id', 'name', 'phoneNumber', 'role', 'firstname', 'lastname', 'personnelCode'
            ]
        });

        if (!user) {
            return null;
        }

        return {
            id: user.id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            firstname: user.firstname,
            lastname: user.lastname,
            personnelCode: user.personnelCode,
            profileImage: user.profileImage,
        };
    }
}
