import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class RoleUser1623797008723 implements MigrationInterface {
	up = async (queryRunner: QueryRunner): Promise<void> => {
		await queryRunner.createTable(
			new Table({
				name: 'role_user',
				columns: [
					{
						name: 'role_id',
						type: 'uuid',
						isPrimary: true,
					},
					{
						name: 'user_id',
						type: 'uuid',
						isPrimary: true,
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
				],
				foreignKeys: [
					{
						columnNames: ['role_id'],
						referencedColumnNames: ['id'],
						referencedTableName: 'roles',
					},
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
		await queryRunner.dropTable('role_user');
	};
}
