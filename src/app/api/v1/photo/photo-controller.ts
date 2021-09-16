import { Request } from 'express';
import * as photoRepository from 'domains/photo/photo-repository';
import { wrap } from 'utils/wrap';

export const index = wrap((req: Request) =>
	photoRepository.index(req.query).then((photos) => ({
			body: {
				message: 'success',
				...photos,
			},
		})
	)
);

export const show = wrap((req: Request) =>
	photoRepository.show(req.params.uuid).then((photo) => ({
		body: {
			message: 'success',
			result: photo,
		},
	}))
);

export const create = wrap((req: Request) =>
	photoRepository.create(req).then((photo) => ({
		body: {
			message: 'success',
			result: photo,
		},
	}))
);

export const update = wrap((req: Request) =>
	photoRepository.update(req).then((photo) => ({
		body: {
			message: 'success',
			result: photo,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	photoRepository.destroy(req.params.uuid).then((photo) => ({
		body: {
			message: 'success',
			result: photo,
		},
	}))
);
