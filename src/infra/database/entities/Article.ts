import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	DeleteDateColumn,
	CreateDateColumn,
	OneToOne,
	JoinColumn,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import { Author } from './Author';
import { User } from './User';
import { Tag } from './Tag';

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

	@ManyToMany(() => Tag, (tag) => tag.articles)
	@JoinTable({
		name: 'article_tag',
		joinColumn: {
			name: 'article_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'tag_id',
			referencedColumnName: 'id',
		},
	})
	tags: Tag[];

	@OneToOne(() => Author, (author) => author)
	@JoinColumn({ name: 'author_id' })
	author: Author;

	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
	updatedAt: Date;

	@DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
	deletedAt: Date;
}
