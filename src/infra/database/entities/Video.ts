import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	DeleteDateColumn,
	CreateDateColumn,
	OneToOne,
	JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity('videos')
export class Video {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar')
	title: string;

	@Column('text')
	description: string;

	@Column('varchar')
	url: string;

	@OneToOne(() => User, (user) => user.id)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
	updatedAt: Date;

	@DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
	deletedAt: Date;
}
