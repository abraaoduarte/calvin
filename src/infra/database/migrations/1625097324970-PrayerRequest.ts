import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PrayerRequest1625097324970 implements MigrationInterface {
	up = async (queryRunner: QueryRunner): Promise<void> => {
		await queryRunner.createTable(
			new Table({
				name: 'prayer_requests',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						isUnique: true,
						generationStrategy: 'uuid',
						default: `uuid_generate_v4()`,
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'description',
						type: 'varchar',
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						isNullable: true,
					},
					{
						name: 'deleted_at',
						type: 'timestamp',
						isNullable: true,
					},
				],
			}),
			true
		);
	};

	down = async (queryRunner: QueryRunner): Promise<void> => {
		await queryRunner.dropTable('prayer_requests');
	};
}
