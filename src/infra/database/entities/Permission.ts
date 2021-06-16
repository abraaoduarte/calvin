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
import { Role } from './Role';
import { User } from './User';

@Entity('permissions')
export class Permission {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar')
	name: string;

	@Column({ name: 'readable_name', type: 'varchar', unique: true })
	readableName: string;

	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
	updatedAt: Date;

	@DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
	deletedAt: Date;

	@ManyToMany(() => Role, (role) => role.permissions)
	@JoinTable({
		name: 'permission_role',
		joinColumn: {
			name: 'permission_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'role_id',
			referencedColumnName: 'id',
		},
	})
	roles: Role[];

	@ManyToMany(() => User, (user) => user.permissions)
	@JoinTable({
		name: 'permission_user',
		joinColumn: {
			name: 'permission_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'user_id',
			referencedColumnName: 'id',
		},
	})
	users: User[];
}
