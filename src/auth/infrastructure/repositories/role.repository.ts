import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../domain/role';
import { RoleEntity } from '../entities/role.entity';
import { RoleMapper } from '../mappers/role.mapper';
import { RoleRepository } from 'src/auth/application/ports/role.repository';

@Injectable()
export class RoleRepositoryImpl implements RoleRepository {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
    ) { }

    async save(role: Role): Promise<void> {
        const roleEntity = RoleMapper.toEntity(role);
        await this.roleRepository.save(roleEntity);
    }

    async findById(id: number): Promise<Role | null> {
        const roleEntity = await this.roleRepository.findOne({ where: { id }, relations: ['permissions'] });
        return roleEntity ? RoleMapper.toDomain(roleEntity) : null;
    }

    async findAll(): Promise<Role[]> {
        const roleEntities = await this.roleRepository.find({ relations: ['permissions'] });
        return roleEntities.map(RoleMapper.toDomain);
    }
}
