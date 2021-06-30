import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Author1625094661864 implements MigrationInterface {
	up = async (queryRunner: QueryRunner): Promise<void> => {
		await queryRunner.createTable(
			new Table({
				name: 'authors',
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
						type: 'text',
					},
					{
						name: 'avatar',
						type: 'varchar',
					},
					{
						name: 'email',
						type: 'varchar',
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
		await queryRunner.dropTable('authors');
	};
}
