import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DepartmentEntity } from './department.entity';

@Entity('teams')
export class TeamEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    departmentId: number;

    @ManyToOne(() => DepartmentEntity, department => department.teams)
    @JoinColumn({ name: 'departmentId' })
    department: DepartmentEntity;

    @Column({ nullable: true })
    supervisorId: number;

    @Column()
    title: string;

    @Column({ default: '#1E73E3' })
    color: string;

    @Column({ nullable: true })
    description: string;
}