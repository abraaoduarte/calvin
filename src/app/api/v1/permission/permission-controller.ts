import { Request } from 'express';
import * as permissionRepository from 'domains/permission/permission-repository';
import { wrap } from 'utils/wrap';

export const index = wrap((req: Request) =>
	permissionRepository.index(req.query).then((permissions) => ({
			body: {
				message: 'success',
				...permissions,
			},
		})
	)
);

export const show = wrap((req: Request) =>
	permissionRepository.show(req.params.uuid).then((permission) => ({
		body: {
			message: 'success',
			result: permission,
		},
	}))
);

export const create = wrap((req: Request) =>
	permissionRepository.create(req).then((permission) => ({
		body: {
			message: 'success',
			result: permission,
		},
	}))
);

export const update = wrap((req: Request) =>
	permissionRepository.update(req).then((permission) => ({
		body: {
			message: 'success',
			result: permission,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	permissionRepository.destroy(req.params.uuid).then((permission) => ({
		body: {
			message: 'success',
			result: permission,
		},
	}))
);
