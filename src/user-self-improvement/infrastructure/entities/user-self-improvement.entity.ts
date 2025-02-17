import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user-self-improvement')
export class UserSelfImprovementEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    improvementId: number;

    @Column()
    userScore: number;

    @Column({ nullable: true })
    supervisorScore: number | null;

    @Column()
    date: Date;

    @Column({ nullable: true })
    description: string;
}
