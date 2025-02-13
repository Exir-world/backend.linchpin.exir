import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SelfImprovementEntity } from './self-improvement.entity';

@Entity('self-improvement-item')
export class SelfImprovementItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'int', default: 0 })
    score: number;

    @ManyToOne(() => SelfImprovementEntity, (selfImprovement) => selfImprovement.id, { onDelete: 'CASCADE' })
    selfImprovement: SelfImprovementEntity;
}
