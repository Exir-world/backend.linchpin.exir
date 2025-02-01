import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShiftTimeEntity } from "./shift-time.entity";

@Entity({ name: "shifts" })
export class ShiftEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    organizationId: number;

    @Column()
    title: string;

    @OneToMany(() => ShiftTimeEntity, (shiftTime) => shiftTime.shift)
    shiftTimes: ShiftTimeEntity[];
}