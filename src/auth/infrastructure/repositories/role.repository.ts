import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../entities/role.entity';

@Injectable()
export class RolesRepository extends Repository<RoleEntity> {
    constructor(
        @InjectRepository(RoleEntity)
        repository: Repository<RoleEntity>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
}
