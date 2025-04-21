// src/property-category/entities/property-category.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { PropertyCategoryFeatureEntity } from './property-category-feature.entity';

@Entity('property_categories')
export class PropertyCategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @OneToMany(() => PropertyCategoryFeatureEntity, (feature) => feature.category)
    features: PropertyCategoryFeatureEntity[];
}
