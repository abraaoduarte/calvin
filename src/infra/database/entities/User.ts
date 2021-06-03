import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, DeleteDateColumn, CreateDateColumn } from 'typeorm';

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
}
