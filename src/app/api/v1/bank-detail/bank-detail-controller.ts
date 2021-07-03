import { Request } from 'express';
import * as bankDetailRepository from 'domains/bank-detail/bank-detail-repository';
import { wrap } from 'utils/wrap';

export const index = wrap(() =>
	bankDetailRepository.index().then((bankDetails) => ({
		body: {
			message: 'success',
			result: bankDetails,
		},
	}))
);

export const show = wrap((req: Request) =>
	bankDetailRepository.show(req.params.uuid).then((bankDetails) => ({
		body: {
			message: 'success',
			result: bankDetails,
		},
	}))
);

export const create = wrap((req: Request) =>
	bankDetailRepository.create(req).then((bankDetails) => ({
		body: {
			message: 'success',
			result: bankDetails,
		},
	}))
);

export const update = wrap((req: Request) =>
	bankDetailRepository.update(req).then((bankDetails) => ({
		body: {
			message: 'success',
			result: bankDetails,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	bankDetailRepository.destroy(req.params.uuid).then((bankDetails) => ({
		body: {
			message: 'success',
			result: bankDetails,
		},
	}))
);
