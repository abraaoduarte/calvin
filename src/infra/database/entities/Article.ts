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

export type ArticleStatus = 'draft' | 'published';

@Entity('articles')
export class Article {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar')
	title: string;

	@Column('jsonb')
	body: string;

	@Column({ type: 'varchar', unique: true })
	slug: string;

	@Column({
		type: 'enum',
		enum: ['draft', 'published'],
	})
	status: ArticleStatus;

	@OneToOne(() => User, (user) => user)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
	updatedAt: Date;

	@DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
	deletedAt: Date;
}
