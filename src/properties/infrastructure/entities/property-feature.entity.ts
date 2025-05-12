// src/property-feature/entities/property-feature.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PropertyCategoryFeatureEntity } from './property-category-feature.entity';
import { PropertyEntity } from './property.entity';

@Entity('property_features')
export class PropertyFeatureEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    value: string;

    @ManyToOne(() => PropertyEntity)
    @JoinColumn({ name: 'property_id' })
    property: PropertyEntity;

    @ManyToOne(() => PropertyCategoryFeatureEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'feature_id' })
    feature: PropertyCategoryFeatureEntity;
}
