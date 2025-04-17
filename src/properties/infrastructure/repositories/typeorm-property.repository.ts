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
        const where: any = {};

        if (organizationId) {
            where.organizationId = organizationId;
        }

        if (departmentId) {
            where.departmentId = departmentId;
        }

        return await this.repo.find({ where, relations: ['userProperties'] });
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
