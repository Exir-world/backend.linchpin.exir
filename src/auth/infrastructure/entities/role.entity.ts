import { Permission } from 'src/auth/domain/enums/permission.enum';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('roles')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    organizationId: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ array: true, type: 'enum', enum: Permission, default: [] })
    permissions: Permission[];

    @CreateDateColumn()
    createdAt: Date;
}
