import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user_employment_settings" })
export class UserEmploymentSettingsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    shiftId: number;

    @Column({ type: "decimal", precision: 5, scale: 2 })
    salaryCoef: number;

    @Column({ default: true })
    needLocation: boolean;
}
