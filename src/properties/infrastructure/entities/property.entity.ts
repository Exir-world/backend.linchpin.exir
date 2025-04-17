import { PropertyStatusEnum } from 'src/properties/domain/enums/property-status.enum';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { UserPropertyEntity } from './user-property.entity';

@Entity('properties')
export class PropertyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ unique: true })
    code: string;

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
}
