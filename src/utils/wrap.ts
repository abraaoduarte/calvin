import { Request, NextFunction, Response } from 'express';
import { makeResponseHandler } from './make-response-handler';

type Fn = (request?: Request) => Promise<unknown>;

const wrap = (fn: Fn) => async (request: Request, response: Response, next: NextFunction) =>
	fn(request)
		.then(makeResponseHandler(response))
		.catch((error) => next(error));

export { wrap };
