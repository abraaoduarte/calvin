import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Article1624964357254 implements MigrationInterface {
	up = async (queryRunner: QueryRunner): Promise<void> => {
		await queryRunner.createTable(
			new Table({
				name: 'articles',
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
						name: 'title',
						type: 'varchar',
					},
					{
						name: 'body',
						type: 'jsonb',
					},
					{
						name: 'slug',
						type: 'varchar',
						isUnique: true,
					},
					{
						name: 'status',
						type: 'enum',
						enum: ['draft', 'published'],
					},
					{
						name: 'user_id',
						type: 'uuid',
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
				foreignKeys: [
					{
						columnNames: ['user_id'],
						referencedColumnNames: ['id'],
						referencedTableName: 'users',
					},
				],
			}),
			true
		);
	};

	down = async (queryRunner: QueryRunner): Promise<void> => {
		await queryRunner.dropTable('articles');
	};
}
