import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ImprovementParameterEntity } from './improvement-parameter.entitiy';

@Entity('user_improvement_parameters')
export class UserImprovementParameterEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @ManyToOne(() => ImprovementParameterEntity, (improvement) => improvement.userImprovementParameters)
    improvementParameter: ImprovementParameterEntity;

    @Column()
    userScore: number;

    @Column({ nullable: true })
    supervisorScore: number | null;

    @Column()
    date: Date;

    @Column({ nullable: true })
    description: string;
}
