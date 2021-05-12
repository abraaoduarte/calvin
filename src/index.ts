import server from 'infra/server';
import listen from 'infra/listen';
import env from 'utils/env';
import connection from 'infra/database/connection';
import 'reflect-metadata';

listen(server)
	.then(async () => {
		await connection;

		console.log('Connected to database');
		console.log(`PORT: ${env('PORT', '3001')}`);
		console.log('SERVER STARTED');
	})
	.catch((error) => {
		console.error(error);
	});
