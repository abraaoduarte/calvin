import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class articleTag1630668220673 implements MigrationInterface {
	up = async (queryRunner: QueryRunner): Promise<void> => {
		await queryRunner.createTable(
			new Table({
				name: 'article_tag',
				columns: [
					{
						name: 'article_id',
						type: 'uuid',
						isPrimary: true,
					},
					{
						name: 'tag_id',
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
						columnNames: ['article_id'],
						referencedColumnNames: ['id'],
						referencedTableName: 'articles',
					},
					{
						columnNames: ['tag_id'],
						referencedColumnNames: ['id'],
						referencedTableName: 'tags',
					},
				],
			}),
			true
		);
	};

	down = async (queryRunner: QueryRunner): Promise<void> => {
		await queryRunner.dropTable('article_tag');
	};
}
