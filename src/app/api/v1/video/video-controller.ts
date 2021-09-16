import { Request } from 'express';
import * as videoRepository from 'domains/video/video-repository';
import { wrap } from 'utils/wrap';

export const index = wrap((req: Request) =>
	videoRepository.index(req.query).then((videos) => ({
			body: {
				message: 'success',
				...videos,
			},
		})
	)
);

export const show = wrap((req: Request) =>
	videoRepository.show(req.params.uuid).then((video) => ({
		body: {
			message: 'success',
			result: video,
		},
	}))
);

export const create = wrap((req: Request) =>
	videoRepository.create(req).then((video) => ({
		body: {
			message: 'success',
			result: video,
		},
	}))
);

export const update = wrap((req: Request) =>
	videoRepository.update(req).then((video) => ({
		body: {
			message: 'success',
			result: video,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	videoRepository.destroy(req.params.uuid).then((video) => ({
		body: {
			message: 'success',
			result: video,
		},
	}))
);
