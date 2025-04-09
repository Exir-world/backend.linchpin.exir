import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { TeamEntity } from './team.entity';
import { OneToMany } from 'typeorm';

@Entity('departments')
export class DepartmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    organizationId: number;

    @ManyToOne(() => OrganizationEntity, (organization) => organization.departments)
    @JoinColumn({ name: 'organizationId' })
    organization: OrganizationEntity;

    @Column({ nullable: true })
    supervisorId: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => TeamEntity, (team) => team.department)
    teams: TeamEntity[];
}