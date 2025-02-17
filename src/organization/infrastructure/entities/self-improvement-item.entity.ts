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

    @Column({ default: '' })
    image: string;

    @Column({ default: '' })
    color: string;

    @ManyToOne(() => SelfImprovementEntity, (selfImprovement) => selfImprovement.id, { onDelete: 'CASCADE' })
    selfImprovement: SelfImprovementEntity;
}
