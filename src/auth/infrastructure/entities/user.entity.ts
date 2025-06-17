import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    organizationId: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ nullable: true })
    profileImage: string;

    @Column({ type: 'varchar', length: 100, default: '' })
    firstname: string;

    @Column({ type: 'varchar', length: 100, default: '' })
    lastname: string;

    @Column({ type: 'varchar', length: 15, unique: true })
    phoneNumber: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @ManyToOne(() => RoleEntity, { nullable: false })
    role: RoleEntity;

    @Column({ type: 'varchar', length: 10, unique: true, nullable: true })
    nationalCode: string;

    @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
    personnelCode: string;

    @Column({ type: 'boolean', default: false })
    isDeleted: boolean;

    @Column({ type: 'boolean', default: false })
    hasAdminPanelAccess: boolean;
}
