import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { CheckPointItemEntity } from './check-point-item.entity';

@Entity('check_points')
export class CheckPointEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    organizationId: number;

    @Column()
    title: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => CheckPointItemEntity, (item) => item.checkPoint, {
        cascade: true,
    })
    items: CheckPointItemEntity[];
}
