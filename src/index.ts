import server from 'infra/server';
import listen from 'infra/listen';
import env from 'utils/env';

const start = () =>
	listen(server)
		.then(() => {
			console.log(`PORT: ${env('PORT', 3001)}`);
			console.log('SERVER STARTED');
		})
		.catch((error) => {
			console.error(error);
		});

start();
