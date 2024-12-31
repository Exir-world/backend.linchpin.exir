import { RequestStatus } from "src/requests/domain/enums/request-status.enum";
import { RequestType } from "src/requests/domain/enums/request-type.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('requests')
export class RequestEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: RequestType })
    type: RequestType;

    @Column({ type: 'enum', enum: RequestStatus, default: RequestStatus.PENDING })
    status: RequestStatus;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'text', nullable: true })
    adminComment?: string;

    @Column()
    userId: number;

    @Column({ type: 'timestamp', nullable: true })
    startTime?: Date;

    @Column({ type: 'timestamp', nullable: true })
    endTime?: Date;

    @Column({ nullable: true })
    reviewedBy?: number;

    @Column({ nullable: true })
    reviewedAt?: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}