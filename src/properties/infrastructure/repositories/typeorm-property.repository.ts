import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyRepository } from 'src/properties/application/repositories/property.repository';
import { Repository } from 'typeorm';
import { PropertyEntity } from '../entities/property.entity';

@Injectable()
export class TypeOrmPropertyRepository implements PropertyRepository {
    constructor(
        @InjectRepository(PropertyEntity)
        private readonly repo: Repository<PropertyEntity>,
    ) { }

    async save(property: PropertyEntity): Promise<PropertyEntity> {
        return await this.repo.save(property);
    }

    async findAll(organizationId?: number, departmentId?: number): Promise<PropertyEntity[]> {
        const query = this.repo.createQueryBuilder('property');

        if (organizationId) {
            query.andWhere('property.organizationId = :organizationId', { organizationId });
        }

        if (departmentId) {
            query.andWhere('property.departmentId = :departmentId', { departmentId });
        }

        return await query.getMany();
    }

    async findById(id: number): Promise<PropertyEntity> {
        return await this.repo.findOneBy({ id });
    }

    async update(id: number, data: Partial<PropertyEntity>): Promise<PropertyEntity> {
        await this.repo.update(id, data);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.repo.delete(id);
    }
}
