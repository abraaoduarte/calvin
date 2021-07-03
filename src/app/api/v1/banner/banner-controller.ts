import { Request } from 'express';
import * as bannerRepository from 'domains/banner/banner-repository';
import { wrap } from 'utils/wrap';

export const index = wrap(() =>
	bannerRepository.index().then((banners) => ({
		body: {
			message: 'success',
			result: banners,
		},
	}))
);

export const show = wrap((req: Request) =>
	bannerRepository.show(req.params.uuid).then((banners) => ({
		body: {
			message: 'success',
			result: banners,
		},
	}))
);

export const create = wrap((req: Request) =>
	bannerRepository.create(req).then((banners) => ({
		body: {
			message: 'success',
			result: banners,
		},
	}))
);

export const update = wrap((req: Request) =>
	bannerRepository.update(req).then((banners) => ({
		body: {
			message: 'success',
			result: banners,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	bannerRepository.destroy(req.params.uuid).then((banners) => ({
		body: {
			message: 'success',
			result: banners,
		},
	}))
);
