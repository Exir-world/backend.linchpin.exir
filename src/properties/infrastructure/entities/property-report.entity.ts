import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { PropertyEntity } from './property.entity';

@Entity('property_reports')
export class PropertyReportEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @ManyToOne(() => PropertyEntity)
    @JoinColumn({ name: 'propertyId' })
    property: PropertyEntity;

    @Column()
    propertyId: number;

    @Column('text')
    report: string;

    @CreateDateColumn()
    createdAt: Date;
}
