import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Index(['userId'], { unique: true })
@Entity()
export class UserLastLocation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column('double precision')
    lat: number;

    @Column('double precision')
    lng: number;

    @UpdateDateColumn()
    lastVisitedAt: Date;
}
