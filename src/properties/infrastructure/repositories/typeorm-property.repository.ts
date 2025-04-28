import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyRepository } from 'src/properties/application/repositories/property.repository';
import { In, IsNull, Not, Repository } from 'typeorm';
import { PropertyEntity } from '../entities/property.entity';
import { UserPropertyEntity } from '../entities/user-property.entity';
import { PropertyFeatureEntity } from '../entities/property-feature.entity';

@Injectable()
export class TypeOrmPropertyRepository implements PropertyRepository {
    constructor(
        @InjectRepository(PropertyEntity)
        private readonly repo: Repository<PropertyEntity>,
        @InjectRepository(UserPropertyEntity)
        private readonly userPropRepo: Repository<UserPropertyEntity>,
        @InjectRepository(PropertyFeatureEntity)
        private readonly propFeatureRepo: Repository<PropertyFeatureEntity>,
    ) { }

    async save(property: PropertyEntity): Promise<PropertyEntity> {
        return await this.repo.save(property);
    }

    async findAll(organizationId?: number, departmentId?: number, isAssigned?: boolean): Promise<PropertyEntity[]> {
        const where: any = {};

        if (organizationId) {
            where.organizationId = organizationId;
        }

        if (departmentId) {
            where.departmentId = departmentId;
        }

        if (isAssigned !== undefined) {
            where.userProperties = { userId: isAssigned ? Not(IsNull()) : IsNull() }
        }

        return await this.repo.find({ where, relations: ['userProperties', 'features.feature'] });
    }

    async findById(id: number): Promise<PropertyEntity> {
        return await this.repo.findOne({ where: { id }, relations: ['features.feature', 'category.features'] });
    }

    async update(id: number, data: any): Promise<PropertyEntity> {
        console.log(data);

        const prop = await this.repo.findOne({ where: { id } });

        if (!prop) {
            throw new NotFoundException('Property not found');
        }

        const { features, categoryId } = data;

        if (categoryId != prop.category.id) {
            await this.propFeatureRepo.delete({ property: { id: prop.id } });
            prop.category = { id: categoryId, title: '', features: [] };
        }

        Object.assign(prop, data);

        if (data.features) {
            prop.features = data.features.map(f => ({ feature: { id: f.featureId }, property: { id: prop.id }, value: f.value }));
        }

        return await this.repo.save(prop);
    }

    async delete(id: number): Promise<void> {
        await this.repo.delete(id);
    }
}
