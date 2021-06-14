import { Request } from 'express';
import * as roleRepository from 'domains/church-detail/church-detail-repository';
import { wrap } from 'utils/wrap';

export const index = wrap(() =>
	roleRepository.index().then((churchDetails) => ({
		body: {
			message: 'success',
			result: churchDetails,
		},
	}))
);

export const show = wrap((req: Request) =>
	roleRepository.show(req.params.uuid).then((churchDetail) => ({
		body: {
			message: 'success',
			result: churchDetail,
		},
	}))
);

export const create = wrap((req: Request) =>
	roleRepository.create(req).then((churchDetail) => ({
		body: {
			message: 'success',
			result: churchDetail,
		},
	}))
);

export const update = wrap((req: Request) =>
	roleRepository.update(req).then((churchDetail) => ({
		body: {
			message: 'success',
			result: churchDetail,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	roleRepository.destroy(req.params.uuid).then((churchDetail) => ({
		body: {
			message: 'success',
			result: churchDetail,
		},
	}))
);
