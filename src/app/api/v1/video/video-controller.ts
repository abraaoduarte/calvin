import { Request } from 'express';
import * as videoRepository from 'domains/video/video-repository';
import { wrap } from 'utils/wrap';

export const index = wrap(() =>
	videoRepository.index().then((videos) => ({
		body: {
			message: 'success',
			result: videos,
		},
	}))
);

export const show = wrap((req: Request) =>
	videoRepository.show(req.params.uuid).then((videos) => ({
		body: {
			message: 'success',
			result: videos,
		},
	}))
);

export const create = wrap((req: Request) =>
	videoRepository.create(req).then((videos) => ({
		body: {
			message: 'success',
			result: videos,
		},
	}))
);

export const update = wrap((req: Request) =>
	videoRepository.update(req).then((videos) => ({
		body: {
			message: 'success',
			result: videos,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	videoRepository.destroy(req.params.uuid).then((videos) => ({
		body: {
			message: 'success',
			result: videos,
		},
	}))
);
