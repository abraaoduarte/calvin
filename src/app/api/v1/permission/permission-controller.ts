import { Request } from 'express';
import * as roleRepository from 'domains/permission/permission-repository';
import { wrap } from 'utils/wrap';

export const index = wrap(() =>
	roleRepository.index().then((permissions) => ({
		body: {
			message: 'success',
			result: permissions,
		},
	}))
);

export const show = wrap((req: Request) =>
	roleRepository.show(req.params.uuid).then((permission) => ({
		body: {
			message: 'success',
			result: permission,
		},
	}))
);

export const create = wrap((req: Request) =>
	roleRepository.create(req).then((permission) => ({
		body: {
			message: 'success',
			result: permission,
		},
	}))
);

export const update = wrap((req: Request) =>
	roleRepository.update(req).then((permission) => ({
		body: {
			message: 'success',
			result: permission,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	roleRepository.destroy(req.params.uuid).then((permission) => ({
		body: {
			message: 'success',
			result: permission,
		},
	}))
);
