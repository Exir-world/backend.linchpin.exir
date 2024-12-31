import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('settings')
export class SettingsEntity {
    @PrimaryGeneratedColumn()
    id: number;
}