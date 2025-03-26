import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SelfImprovementItemEntity } from './self-improvement-item.entity';

@Entity('self-improvement-subitem')
export class SelfImprovementSubItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('int', { array: true, default: [] })
    score: number[];

    @ManyToOne(() => SelfImprovementItemEntity, (selfImprovementItem) => selfImprovementItem.id, { onDelete: 'CASCADE' })
    selfImprovementItem: SelfImprovementItemEntity;
}
