// src/modules/auth/infrastructure/repositories/permission.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PermissionEntity } from '../entities/permission.entity';
import { Permission } from '../../domain/permission';
import { PermissionMapper } from '../mappers/permission.mapper';
import { PermissionRepository } from 'src/auth/application/ports/permission.repository';

@Injectable()
export class PermissionRepositoryImpl implements PermissionRepository {
    constructor(
        @InjectRepository(PermissionEntity)
        private readonly permissionRepository: Repository<PermissionEntity>,
    ) { }

    async findByIds(ids: number[]): Promise<Permission[] | null> {
        return this.permissionRepository.find({ where: { id: In(ids) } });
    }

    async save(permission: Permission): Promise<void> {
        const permissionEntity = PermissionMapper.toEntity(permission);
        await this.permissionRepository.save(permissionEntity);
    }

    async findAll(): Promise<Permission[]> {
        const permissionEntities = await this.permissionRepository.find();
        return permissionEntities.map(PermissionMapper.toDomain);
    }

    async findByName(name: string): Promise<Permission | null> {
        return await this.permissionRepository.findOne({ where: { name } });
    }
}
