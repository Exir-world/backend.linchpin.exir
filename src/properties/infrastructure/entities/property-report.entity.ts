import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { PropertyEntity } from './property.entity';
import { PropertyReportStatusEnum } from 'src/properties/domain/enums/property-report-status.enum';

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

    @Column({ type: 'enum', enum: PropertyReportStatusEnum, default: PropertyReportStatusEnum.PENDING })
    status: PropertyReportStatusEnum;

    @CreateDateColumn()
    createdAt: Date;
}
