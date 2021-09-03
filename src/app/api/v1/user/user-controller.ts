import { Request } from 'express';
import * as userRepository from 'domains/user/user-repository';
import { wrap } from 'utils/wrap';

export const index = wrap((req: Request) =>
	userRepository.index(req.query).then((users) => ({
			body: {
				message: 'success',
				...users,
			},
		})
	)
);

export const show = wrap((req: Request) =>
	userRepository.show(req.params.uuid).then((user) => ({
		body: {
			message: 'success',
			result: user,
		},
	}))
);

export const create = wrap((req: Request) =>
	userRepository.create(req).then((user) => ({
		body: {
			message: 'success',
			result: user,
		},
	}))
);

export const update = wrap((req: Request) =>
	userRepository.update(req).then((user) => ({
		body: {
			message: 'success',
			result: user,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	userRepository.destroy(req.params.uuid).then((user) => ({
		body: {
			message: 'success',
			result: user,
		},
	}))
);
