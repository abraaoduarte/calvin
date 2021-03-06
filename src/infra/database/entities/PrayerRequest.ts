import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, DeleteDateColumn, CreateDateColumn } from 'typeorm';

@Entity('prayer_requests')
export class PrayerRequest {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar')
	name: string;

	@Column('text')
	description: string;

	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
	updatedAt: Date;

	@DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
	deletedAt: Date;
}
