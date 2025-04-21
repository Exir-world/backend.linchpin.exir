import { PropertyStatusEnum } from 'src/properties/domain/enums/property-status.enum';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { UserPropertyEntity } from './user-property.entity';
import { PropertyCategoryEntity } from './property-category.entity';
import { PropertyFeatureEntity } from './property-feature.entity';

@Entity('properties')
export class PropertyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    code: string;

    @ManyToOne(() => PropertyCategoryEntity, { eager: true })
    @JoinColumn({ name: 'categoryId' })
    category: PropertyCategoryEntity;

    @Column({ nullable: true })
    brand?: string;

    @Column({ nullable: true })
    model?: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ type: 'enum', enum: PropertyStatusEnum })
    status: PropertyStatusEnum;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    organizationId: number;

    @Column({ nullable: true })
    departmentId?: number;

    @Column({ nullable: true })
    imageUrl?: string;

    @OneToMany(() => UserPropertyEntity, (userProperty) => userProperty.property)
    userProperties: UserPropertyEntity[];

    @OneToMany(() => PropertyFeatureEntity, (feature) => feature.property, { cascade: true })
    features: PropertyFeatureEntity[];
}
