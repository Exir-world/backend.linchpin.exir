import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    teamId: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ nullable: true })
    profileImage: string;

    @Column({ type: 'varchar', length: 100, default: '' })
    lastname: string;

    @Column({ type: 'varchar', length: 15, unique: true })
    phoneNumber: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @ManyToOne(() => RoleEntity, { nullable: false })
    role: RoleEntity;
}
