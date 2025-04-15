import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { PropertyEntity } from './property.entity';

@Entity('user_properties')
export class UserPropertyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @ManyToOne(() => PropertyEntity)
    @JoinColumn({ name: 'propertyId' })
    property: PropertyEntity;

    @Column()
    propertyId: number;

    @CreateDateColumn()
    deliveredAt: Date;
}
