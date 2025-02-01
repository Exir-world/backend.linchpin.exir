import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShiftEntity } from "./shift.entity";
import { ShiftTimeTypeEnum } from "src/shifts/domain/enums/shift-time-type.enum";

@Entity({ name: "shift_times" })
export class ShiftTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ShiftEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "shift_id" })
    shift: ShiftEntity;

    @Column({ type: "time" })
    startTime: string;

    @Column({ type: "time" })
    endTime: string;

    @Column({
        type: "enum",
        enum: ShiftTimeTypeEnum,
        default: ShiftTimeTypeEnum.WORK
    })
    type: ShiftTimeTypeEnum;
}