import { Request } from 'express';
import * as authRepository from 'domains/auth/auth-repository';
import { wrap } from 'utils/wrap';

export const login = wrap((req: Request) =>
	authRepository.login(req).then((user) => ({
		body: {
			message: 'success',
			result: user,
		},
	}))
);

export const refresh = wrap((req: Request) =>
	authRepository.refresh(req).then((user) => ({
		body: {
			message: 'success',
			result: user,
		},
	}))
);
