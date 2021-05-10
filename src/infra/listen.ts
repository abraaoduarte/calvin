import * as http from 'http';
import { Express } from 'express';
import env from 'utils/env';

function listen(handler: Express, { port = env('PORT', 3001) } = {}): Promise<void> {
	return new Promise((resolve, reject) => {
		http.createServer(handler).listen(port).once('listening', resolve).once('error', reject);
	});
}

export default listen;
