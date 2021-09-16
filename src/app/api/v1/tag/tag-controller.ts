import { Request } from 'express';
import * as tagRepository from 'domains/tag/tag-repository';
import { wrap } from 'utils/wrap';

export const index = wrap((req: Request) =>
	tagRepository.index(req.query).then((tags) => ({
			body: {
				message: 'success',
				...tags,
			},
		})
	)
);

export const show = wrap((req: Request) =>
	tagRepository.show(req.params.uuid).then((tag) => ({
		body: {
			message: 'success',
			result: tag,
		},
	}))
);

export const create = wrap((req: Request) =>
	tagRepository.create(req).then((tag) => ({
		body: {
			message: 'success',
			result: tag,
		},
	}))
);

export const update = wrap((req: Request) =>
	tagRepository.update(req).then((tag) => ({
		body: {
			message: 'success',
			result: tag,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	tagRepository.destroy(req.params.uuid).then((tag) => ({
		body: {
			message: 'success',
			result: tag,
		},
	}))
);
