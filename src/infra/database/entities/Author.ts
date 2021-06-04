import { Entity, PrimaryGeneratedColumn, ManyToMany, Column, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, JoinTable } from 'typeorm';
import { User } from './User';

@Entity('Authors')
export class Author {
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column('varchar')
    name: string;

    @Column('text')
    description: string;

    @Column('varchar')
    avatar: string;

    @Column('varchar')
    email: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
	updatedAt: Date;

	@DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
	deletedAt: Date;

    @ManyToMany (() => User)
    @JoinTable ()
    Users : User [];



}