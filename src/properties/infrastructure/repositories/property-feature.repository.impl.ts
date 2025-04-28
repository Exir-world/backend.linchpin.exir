// src/property-feature/repositories/property-feature.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyFeatureEntity } from '../entities/property-feature.entity';
import { PropertyFeatureMapper } from '../mappers/property-feature.mapper';
import { PropertyFeatureRepository } from 'src/properties/application/repositories/property-feature.repository';
import { PropertyFeature } from 'src/properties/domain/property-feature.domain';

@Injectable()
export class PropertyFeatureRepositoryImpl extends PropertyFeatureRepository {
    constructor(
        @InjectRepository(PropertyFeatureEntity)
        private readonly repo: Repository<PropertyFeatureEntity>,
    ) {
        super();
    }

    async addFeatureToProperty(propertyId: number, featureId: number, value: string): Promise<PropertyFeature> {
        const feature = await this.repo.save({
            value,
            feature: { id: featureId } as any,
            property: { id: propertyId } as any,
        });
        return PropertyFeatureMapper.toDomain(feature);
    }

    async addFeatureToProperties(propertyId: number, features: { featureId: number, value: string }[]): Promise<PropertyFeature[]> {
        const propertyFeatures = features.map((feature) => {
            return this.repo.create({
                value: feature.value,
                feature: { id: feature.featureId } as any,
                property: { id: propertyId } as any,
            });
        });

        const savedFeatures = await this.repo.save(propertyFeatures);
        return PropertyFeatureMapper.toDomainList(savedFeatures);
    }

    async removeFeatureFromProperty(id: number): Promise<void> {
        await this.repo.delete(id);
    }

    async findAllByPropertyId(propertyId: number): Promise<PropertyFeature[]> {
        const list = await this.repo.find({
            where: { property: { id: propertyId } },
            relations: ['feature', 'feature.category'],
        });
        return PropertyFeatureMapper.toDomainList(list);
    }
}
