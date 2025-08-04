import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { OrganizationEntity } from './organization.entity';

@Entity()
export class OrganizationSettings {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => OrganizationEntity, { onDelete: 'CASCADE' })
    @JoinColumn()
    organization: OrganizationEntity;

    @Column({ default: true })
    notifyAdminOnUserExit: boolean;

    @Column({ default: true })
    registerUserExit: boolean;
}
