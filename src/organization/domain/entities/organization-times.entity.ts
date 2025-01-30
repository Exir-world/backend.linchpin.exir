import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('organization-times')
export class OrganizationTimesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    organizationId: number;

    @Column({ type: 'time with time zone' })
    startTime: string;

    @Column({ type: 'time with time zone' })
    endTime: string;

    @Column({ default: true })
    isWorkTime: boolean;

    @Column({ nullable: true })
    description: string;
}