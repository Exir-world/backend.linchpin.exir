import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "./task.entity";

@Entity('sub_task')
export class SubtaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => TaskEntity, (task) => task.id, { onDelete: 'CASCADE' })
    task: TaskEntity;

    @Column({ default: false })
    done: boolean;
}