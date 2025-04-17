import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPropertyRepository } from 'src/properties/application/repositories/user-property.repository';
import { Repository } from 'typeorm';
import { UserPropertyEntity } from '../entities/user-property.entity';

@Injectable()
export class TypeOrmUserPropertyRepository implements UserPropertyRepository {
    constructor(
        @InjectRepository(UserPropertyEntity)
        private readonly repo: Repository<UserPropertyEntity>,
    ) { }

    async assign(entity: UserPropertyEntity): Promise<UserPropertyEntity> {
        return this.repo.save(entity);
    }

    async unassign(userId: number, propertyId: number): Promise<void> {
        await this.repo.delete({ userId, propertyId });
    }

    async findByUserId(userId: number): Promise<UserPropertyEntity[]> {
        return this.repo.find({ where: { userId }, relations: ['property'] });
    }
}
