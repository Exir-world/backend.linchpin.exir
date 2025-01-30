import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('organization-criterions')
export class OrganizationCriterionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    organizationId: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;
}