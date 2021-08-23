import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class ArticleAddAuthorId1628593862196 implements MigrationInterface {
	up = async (queryRunner: QueryRunner): Promise<void> => {
		await queryRunner.addColumn(
			'articles',
			new TableColumn({
				name: 'author_id',
				type: 'uuid',
				isNullable: true,
			})
		);

		await queryRunner.createForeignKey(
			'articles',
			new TableForeignKey({
				columnNames: ['author_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'authors',
			})
		);
	};

	down = async (queryRunner: QueryRunner): Promise<void> => {
		const table = await queryRunner.getTable('articles');
		const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('author_id') !== -1);
		await queryRunner.dropForeignKey('articles', foreignKey);
		await queryRunner.dropColumn('articles', 'author_id');
	};
}
