import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	DeleteDateColumn,
	CreateDateColumn,
	ManyToMany,
	JoinTable,
	BeforeInsert,
	BeforeUpdate,
} from 'typeorm';
import bcrypt from 'bcrypt';
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
	password?: string;

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

	@BeforeInsert()
	@BeforeUpdate()
	hashPassword() {
		if (this.password) {
			const saltRounds = 10;
			const salt = bcrypt.genSaltSync(saltRounds);
			const hash = bcrypt.hashSync(this.password, salt);
			this.password = hash;
		}
	}

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
