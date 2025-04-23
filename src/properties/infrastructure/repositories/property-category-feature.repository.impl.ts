// src/property-category-feature/repositories/property-category-feature.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyCategoryFeatureEntity } from '../entities/property-category-feature.entity';
import { PropertyCategoryFeatureMapper } from '../mappers/property-category-feature.mapper';
import { PropertyCategoryFeatureRepository } from 'src/properties/application/repositories/property-category-feature.repository';
import { PropertyCategoryFeature } from 'src/properties/domain/property-category-feature.domain';

@Injectable()
export class PropertyCategoryFeatureRepositoryImpl extends PropertyCategoryFeatureRepository {
    constructor(
        @InjectRepository(PropertyCategoryFeatureEntity)
        private readonly featureRepo: Repository<PropertyCategoryFeatureEntity>,
    ) {
        super();
    }

    async create(categoryId: number, title: string): Promise<PropertyCategoryFeature> {
        const feature = await this.featureRepo.save({
            title,
            category: { id: categoryId } as any,
        });
        return PropertyCategoryFeatureMapper.toDomain(feature);
    }

    async findAllByCategoryId(categoryId: number): Promise<PropertyCategoryFeature[]> {
        const list = await this.featureRepo.find({
            where: { category: { id: categoryId } },
            relations: ['category'],
        });
        return PropertyCategoryFeatureMapper.toDomainList(list);
    }

    async findById(id: number): Promise<PropertyCategoryFeature> {
        const feature = await this.featureRepo.findOne({
            where: { id },
            relations: ['category'],
        });
        return PropertyCategoryFeatureMapper.toDomain(feature);
    }

    async update(id: number, data: Partial<{ title: string }>): Promise<PropertyCategoryFeature> {
        await this.featureRepo.update(id, data);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.featureRepo.delete(id);
    }

    async removeByIds(ids: number[]): Promise<void> {
        await this.featureRepo.delete(ids);
    }

    async saveArray(features: PropertyCategoryFeature[]): Promise<PropertyCategoryFeature[]> {
        const entities = PropertyCategoryFeatureMapper.toEntitiesList(features);
        const savedEntities = await this.featureRepo.save(entities);
        return PropertyCategoryFeatureMapper.toDomainList(savedEntities);
    }
}
