import { Request } from 'express';
import * as roleRepository from 'domains/role/role-repository';
import { wrap } from 'utils/wrap';

export const index = wrap(() =>
	roleRepository.index().then((roles) => ({
		body: {
			message: 'success',
			result: roles,
		},
	}))
);

export const show = wrap((req: Request) =>
	roleRepository.show(req.params.uuid).then((role) => ({
		body: {
			message: 'success',
			result: role,
		},
	}))
);

export const create = wrap((req: Request) =>
	roleRepository.create(req).then((role) => ({
		body: {
			message: 'success',
			result: role,
		},
	}))
);

export const update = wrap((req: Request) =>
	roleRepository.update(req).then((role) => ({
		body: {
			message: 'success',
			result: role,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	roleRepository.destroy(req.params.uuid).then((role) => ({
		body: {
			message: 'success',
			result: role,
		},
	}))
);
