const path = require('path');

module.exports = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	migrationsTableName: 'migrations',
	entities: [path.resolve(process.cwd(), './src/infra/database/entities/*.ts')],
	migrations: [path.resolve(process.cwd(), './src/infra/database/migrations/*.ts')],
	cli: {
		migrationsDir: './src/infra/database/migrations',
	},
};
