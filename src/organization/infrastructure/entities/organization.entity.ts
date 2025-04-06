import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('organization')
export class OrganizationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    creatorId: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    description: string;
}