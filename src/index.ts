import 'reflect-metadata';
import server from 'infra/server';
import listen from 'infra/listen';
import env from 'utils/env';
import connection from 'infra/database/connection';
import logger from 'utils/logger';

listen(server)
	.then(async () => {
		await connection;
		logger.info('DATABASE CONNECTED');
		logger.info(`PORT: ${env('PORT', '3001')}`);
		logger.info('SERVER STARTED');
	})
	.catch((error) => {
		logger.error(error);
	});
