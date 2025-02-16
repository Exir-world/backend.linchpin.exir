import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskTagEntity } from "./task-tag.entity";

@Entity('tag')
export class TagEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    color: string;

    @Column()
    textColor: string;

    @Column()
    icon: string;

    @OneToMany(() => TaskTagEntity, (taskTag) => taskTag.tag)
    taskTags: TaskTagEntity[];
}