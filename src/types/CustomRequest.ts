import { Request } from 'express';

export type CustomRequest = Request & {
	payload: {
		data: {
			user: string;
		};
		iat: number;
		exp: number;
	};
};
