import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { PriorityEntity } from './priority.entity';
import { TaskTagEntity } from './task-tag.entity';
import { SubtaskEntity } from './sub-task.entity';
import { AttachmentEntity } from './attachment.entity';

@Entity('task')
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text' })
    description: string;

    @ManyToOne(() => PriorityEntity, (priority) => priority.tasks, { eager: true })
    priority: PriorityEntity;

    @Column({ type: 'int', nullable: true })
    estimatedDuration?: number;

    @Column({ type: 'date' })
    date: Date;

    @Column({ nullable: true })
    userId?: number;

    @Column()
    createdBy: number;

    @Column({ default: false })
    creatorApprove: boolean;

    @Column({ nullable: true })
    creatorComment: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => SubtaskEntity, (subTask) => subTask.task)
    subTasks: SubtaskEntity[];

    @OneToMany(() => AttachmentEntity, (attachment) => attachment.task)
    attachments: AttachmentEntity[];

    @OneToMany(() => TaskTagEntity, (taskTag) => taskTag.task)
    @JoinColumn()
    taskTags: TaskTagEntity[];
}
