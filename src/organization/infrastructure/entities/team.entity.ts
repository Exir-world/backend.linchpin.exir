import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('teams')
export class TeamEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    organizationId: number;

    @Column()
    title: string;

    @Column({ default: '#1E73E3' })
    color: string;

    @Column({ nullable: true })
    description: string;
}