import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1621939080751 implements MigrationInterface {
	up = async (queryRunner: QueryRunner): Promise<void> => {
		await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
		await queryRunner.createTable(
			new Table({
				name: 'users',
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
						name: 'email',
						type: 'varchar',
						isUnique: true,
					},
					{
						name: 'is_active',
						type: 'boolean',
						default: true,
					},
					{
						name: 'is_admin',
						type: 'boolean',
						default: false,
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
		await queryRunner.dropTable('users');
	};
}
