import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";

@Entity()
export class LocationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int" })
    organizationId: number;

    @Column({ type: "decimal" })
    lat: number;

    @Column({ type: "decimal" })
    lng: number;

    @Column({ type: "int" })
    radius: number; // in meters

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
