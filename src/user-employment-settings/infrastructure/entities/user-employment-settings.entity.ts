import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user_employment_settings" })
export class UserEmploymentSettingsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column({ nullable: true })
    teamId: number;

    @Column({ type: "decimal", default: 0 })
    salary: number;

    @Column()
    shiftId: number;

    @Column({ default: true })
    needLocation: boolean;

    @Column({ nullable: true })
    deviceUniqueCode: string;
}
