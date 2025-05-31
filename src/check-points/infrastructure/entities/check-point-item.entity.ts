import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CheckPointEntity } from './check-point.entity';

@Entity('check_point_items')
export class CheckPointItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 6 })
  lat: number;

  @Column('decimal', { precision: 10, scale: 6 })
  lng: number;

  @Column({ type: 'float', default: 50 })
  radius: number;

  @Column({ default: false })
  needReport: boolean;

  @ManyToOne(() => CheckPointEntity, (checkPoint) => checkPoint.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'checkPointId' })
  checkPoint: CheckPointEntity;

  @Column()
  checkPointId: number;
}
