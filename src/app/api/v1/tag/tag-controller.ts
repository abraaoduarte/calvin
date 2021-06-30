import { Request } from 'express';
import * as tagRepository from 'domains/tag/tag-repository';
import { wrap } from 'utils/wrap';

export const index = wrap(() =>
	tagRepository.index().then((tags) => ({
		body: {
			message: 'success',
			result: tags,
		},
	}))
);

export const show = wrap((req: Request) =>
	tagRepository.show(req.params.uuid).then((tags) => ({
		body: {
			message: 'success',
			result: tags,
		},
	}))
);

export const create = wrap((req: Request) =>
	tagRepository.create(req).then((tags) => ({
		body: {
			message: 'success',
			result: tags,
		},
	}))
);

export const update = wrap((req: Request) =>
	tagRepository.update(req).then((tags) => ({
		body: {
			message: 'success',
			result: tags,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	tagRepository.destroy(req.params.uuid).then((tags) => ({
		body: {
			message: 'success',
			result: tags,
		},
	}))
);
