import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "./task.entity";
import { TagEntity } from "./tag.entity";

@Entity('task_tag')
export class TaskTagEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TaskEntity, (task) => task.id, { onDelete: 'CASCADE' })
    task: TaskEntity;

    @ManyToOne(() => TagEntity, (tag) => tag.id, { onDelete: 'CASCADE' })
    tag: TagEntity;
}