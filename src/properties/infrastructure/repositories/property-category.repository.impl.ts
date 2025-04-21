// src/property-category/repositories/property-category.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyCategoryEntity } from '../entities/property-category.entity';
import { PropertyCategoryMapper } from '../mappers/property-category.mapper';
import { PropertyCategoryRepository } from 'src/properties/application/repositories/property-category.repository';
import { PropertyCategoryFeatureEntity } from '../entities/property-category-feature.entity';
import { PropertyCategory } from 'src/properties/domain/property-category.domain';

@Injectable()
export class PropertyCategoryRepositoryImpl extends PropertyCategoryRepository {
    constructor(
        @InjectRepository(PropertyCategoryEntity)
        private readonly categoryRepo: Repository<PropertyCategoryEntity>,

        @InjectRepository(PropertyCategoryFeatureEntity)
        private readonly featureRepo: Repository<PropertyCategoryFeatureEntity>,
    ) {
        super();
    }

    async create(title: string, features?: { title: string }[]): Promise<PropertyCategory> {
        const category = await this.categoryRepo.save({ title });

        if (features?.length) {
            for (const f of features) {
                const feature = new PropertyCategoryFeatureEntity();
                feature.title = f.title;
                feature.category = category;
                await this.featureRepo.save(feature);
            }
        }

        const created = await this.categoryRepo.findOne({
            where: { id: category.id },
            relations: ['features'],
        });

        return PropertyCategoryMapper.toDomain(created);
    }

    async findAll(): Promise<PropertyCategory[]> {
        const list = await this.categoryRepo.find({ relations: ['features'] });
        return PropertyCategoryMapper.toDomainList(list);
    }

    async findById(id: number): Promise<PropertyCategory> {
        const category = await this.categoryRepo.findOne({ where: { id }, relations: ['features'] });
        return PropertyCategoryMapper.toDomain(category);
    }

    async update(id: number, data: Partial<{ title: string }>): Promise<PropertyCategory> {
        await this.categoryRepo.update(id, data);
        const updated = await this.findById(id);
        return updated;
    }

    async delete(id: number): Promise<void> {
        await this.categoryRepo.delete(id);
    }
}
