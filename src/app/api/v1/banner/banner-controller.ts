import { Request } from 'express';
import * as bannerRepository from 'domains/banner/banner-repository';
import { wrap } from 'utils/wrap';

export const index = wrap((req: Request) =>
	bannerRepository.index(req.query).then((banners) => ({
			body: {
				message: 'success',
				...banners,
			},
		})
	)
);

export const show = wrap((req: Request) =>
	bannerRepository.show(req.params.uuid).then((banner) => ({
		body: {
			message: 'success',
			result: banner,
		},
	}))
);

export const create = wrap((req: Request) =>
	bannerRepository.create(req).then((banner) => ({
		body: {
			message: 'success',
			result: banner,
		},
	}))
);

export const update = wrap((req: Request) =>
	bannerRepository.update(req).then((banner) => ({
		body: {
			message: 'success',
			result: banner,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	bannerRepository.destroy(req.params.uuid).then((banner) => ({
		body: {
			message: 'success',
			result: banner,
		},
	}))
);
