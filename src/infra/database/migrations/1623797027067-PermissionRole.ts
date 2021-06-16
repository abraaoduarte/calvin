import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PermissionRole1623797027067 implements MigrationInterface {
	up = async (queryRunner: QueryRunner): Promise<void> => {
		await queryRunner.createTable(
			new Table({
				name: 'permission_role',
				columns: [
					{
						name: 'permission_id',
						type: 'uuid',
						isPrimary: true,
					},
					{
						name: 'role_id',
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
						columnNames: ['role_id'],
						referencedColumnNames: ['id'],
						referencedTableName: 'roles',
					},
				],
			}),
			true
		);
	};

	down = async (queryRunner: QueryRunner): Promise<void> => {
		await queryRunner.dropTable('permission_role');
	};
}
