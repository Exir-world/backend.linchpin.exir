import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { SelfImprovementEntity } from './self-improvement.entity';
import { SelfImprovementItemTypeEnum } from 'src/organization/domain/enums/self-improvement-item-type.enum';
import { SelfImprovementSubItemEntity } from './self-improvement-subitem.entity';

@Entity('self-improvement-item')
export class SelfImprovementItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    // @Column({ type: 'int', default: 0 })
    // score: number;

    @Column({ type: 'enum', enum: SelfImprovementItemTypeEnum, default: SelfImprovementItemTypeEnum.IMPROVMENT })
    type: SelfImprovementItemTypeEnum;

    @Column({ default: '' })
    image: string;

    @Column({ default: '' })
    color: string;

    @ManyToOne(() => SelfImprovementEntity, (selfImprovement) => selfImprovement.id, { onDelete: 'CASCADE' })
    selfImprovement: SelfImprovementEntity;

    @OneToMany(() => SelfImprovementSubItemEntity, (subItem) => subItem.selfImprovementItem, { cascade: true })
    subItems: SelfImprovementSubItemEntity[];
}
