import { Request } from 'express';
import * as churchDetailRepository from 'domains/church-detail/church-detail-repository';
import { wrap } from 'utils/wrap';

export const index = wrap((req: Request) =>
	churchDetailRepository.index(req.query).then((churchDetails) => ({
			body: {
				message: 'success',
				...churchDetails,
			},
		})
	)
);

export const show = wrap((req: Request) =>
	churchDetailRepository.show(req.params.uuid).then((churchDetail) => ({
		body: {
			message: 'success',
			result: churchDetail,
		},
	}))
);

export const create = wrap((req: Request) =>
	churchDetailRepository.create(req).then((churchDetail) => ({
		body: {
			message: 'success',
			result: churchDetail,
		},
	}))
);

export const update = wrap((req: Request) =>
	churchDetailRepository.update(req).then((churchDetail) => ({
		body: {
			message: 'success',
			result: churchDetail,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	churchDetailRepository.destroy(req.params.uuid).then((churchDetail) => ({
		body: {
			message: 'success',
			result: churchDetail,
		},
	}))
);
