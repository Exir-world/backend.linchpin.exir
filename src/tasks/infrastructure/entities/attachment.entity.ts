import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "./task.entity";
import { FileTypeEnum } from "src/tasks/domain/enums/file-type.enum";

@Entity('attachment')
export class AttachmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TaskEntity, (task) => task.id, { onDelete: 'CASCADE' })
    task: TaskEntity;

    @Column({ type: 'enum', enum: FileTypeEnum })
    fileType: FileTypeEnum;

    @Column()
    fileName: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    fileSize: number;

    @Column()
    link: string;
}