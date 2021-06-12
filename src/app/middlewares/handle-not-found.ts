import { Request, Response } from 'express';

const handleNotFound = () => (request: Request, response: Response) =>
	response.status(404).json({
		message: 'This route does not exist',
		detail: {
			hostname: request.hostname,
			originalUrl: request.originalUrl,
			method: request.method,
		},
	});

export { handleNotFound };
