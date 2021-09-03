import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class authorTableAddNullableToAvatar1630671685027 implements MigrationInterface {
	up = async (queryRunner: QueryRunner): Promise<void> => {
		await queryRunner.changeColumn('authors', 'avatar', new TableColumn({
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
        }))
	};

	down = async (): Promise<void> => {};
}
