import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "./task.entity";

@Entity('priority')
export class PriorityEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    priority: number;

    @Column()
    color: string;

    @OneToMany(() => TaskEntity, (task) => task.priority)
    tasks: TaskEntity[];
}