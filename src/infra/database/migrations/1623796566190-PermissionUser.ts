import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PermissionUser1623796566190 implements MigrationInterface {
	up = async (queryRunner: QueryRunner): Promise<void> => {
		await queryRunner.createTable(
			new Table({
				name: 'permission_user',
				columns: [
					{
						name: 'permission_id',
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
						columnNames: ['permission_id'],
						referencedColumnNames: ['id'],
						referencedTableName: 'permissions',
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
		await queryRunner.dropTable('permission_user');
	};
}
