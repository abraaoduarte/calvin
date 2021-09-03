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
import { User } from './User';
import { Article } from './Article';

@Entity('tags')
export class Tag {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar')
	title: string;

	@Column({ type: 'varchar', unique: true })
	slug: string;

	@OneToOne(() => User, (user) => user.id)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToMany(() => Article, (article) => article.tags)
	@JoinTable({
		name: 'article_tag',
		joinColumn: {
			name: 'tag_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'article_id',
			referencedColumnName: 'id',
		},
	})
	articles: Article[];

	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
	updatedAt: Date;

	@DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
	deletedAt: Date;
}
