import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user_criterions')
export class UserCriterionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    criterionId: number;

    @Column({ default: false })
    userScore: boolean;

    @Column({ nullable: true })
    supervisorScore: boolean | null;

    @Column()
    date: Date;
}
