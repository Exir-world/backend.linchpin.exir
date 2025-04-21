// src/property-category-feature/entities/property-category-feature.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PropertyCategoryEntity } from './property-category.entity';

@Entity('property_category_features')
export class PropertyCategoryFeatureEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @ManyToOne(() => PropertyCategoryEntity, { eager: true })
    @JoinColumn({ name: 'category_id' })
    category: PropertyCategoryEntity;
}
