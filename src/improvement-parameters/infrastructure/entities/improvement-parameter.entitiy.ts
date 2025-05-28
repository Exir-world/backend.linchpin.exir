import { ImprovementTypeEnum } from 'src/improvement-parameters/domain/enums/improvement-type.enum';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { UserImprovementParameterEntity } from './user-improvement-parameter.entitiy';

@Entity('improvement_parameters')
export class ImprovementParameterEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'enum', enum: ImprovementTypeEnum })
    type: ImprovementTypeEnum;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true })
    color: string;

    @Column('int', { array: true, default: [] })
    score: number[];

    @ManyToOne(() => ImprovementParameterEntity, (item) => item.children, { nullable: true })
    parent?: ImprovementParameterEntity;

    @OneToMany(() => ImprovementParameterEntity, (item) => item.parent)
    children: ImprovementParameterEntity[];

    @OneToMany(() => UserImprovementParameterEntity, (improvement) => improvement.improvementParameter)
    userImprovementParameters: UserImprovementParameterEntity[];
}
