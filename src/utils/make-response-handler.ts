import { Response } from 'express';

const makeResponseHandler =
	(response: Response) =>
	({ status = 200, headers = {}, body }) => {
		response.set(headers);
		response.status(status);
		response.json(body);
	};

export { makeResponseHandler };
