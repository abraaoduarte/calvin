import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	DeleteDateColumn,
	CreateDateColumn,
	ManyToMany,
	JoinTable,
} from 'typeorm';

import { Permission } from './Permission';
import { Role } from './Role';
@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar')
	name: string;

	@Column({ type: 'varchar', unique: true })
	email: string;

	@Column({ type: 'varchar' })
	password: string;

	@Column({ type: 'boolean', name: 'is_active' })
	isActive: boolean;

	@Column({ type: 'boolean', name: 'is_admin' })
	isAdmin: boolean;

	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
	updatedAt: Date;

	@DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
	deletedAt: Date;

	@ManyToMany(() => Permission, (permission) => permission.users)
	@JoinTable({
		name: 'permission_user',
		joinColumn: {
			name: 'user_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'permission_id',
			referencedColumnName: 'id',
		},
	})
	permissions: Permission[];

	@ManyToMany(() => Role, (role) => role.users)
	@JoinTable({
		name: 'role_user',
		joinColumn: {
			name: 'user_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'role_id',
			referencedColumnName: 'id',
		},
	})
	roles: Role[];
}
