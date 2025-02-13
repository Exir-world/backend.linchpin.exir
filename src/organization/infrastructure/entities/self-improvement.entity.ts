import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SelfImprovementItemEntity } from './self-improvement-item.entity';

@Entity('self-improvement')
export class SelfImprovementEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    organizationId: number;

    @Column()
    title: string;

    @Column({ default: false })
    isDefault: boolean;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => SelfImprovementItemEntity, (item) => item.selfImprovement, { cascade: true })
    items: SelfImprovementItemEntity[];
}