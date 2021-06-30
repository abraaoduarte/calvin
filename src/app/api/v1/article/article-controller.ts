import { Request } from 'express';
import * as articleRepository from 'domains/article/article-repository';
import { wrap } from 'utils/wrap';

export const index = wrap(() =>
	articleRepository.index().then((articles) => ({
		body: {
			message: 'success',
			result: articles,
		},
	}))
);

export const show = wrap((req: Request) =>
	articleRepository.show(req.params.uuid).then((articles) => ({
		body: {
			message: 'success',
			result: articles,
		},
	}))
);

export const create = wrap((req: Request) =>
	articleRepository.create(req).then((articles) => ({
		body: {
			message: 'success',
			result: articles,
		},
	}))
);

export const update = wrap((req: Request) =>
	articleRepository.update(req).then((articles) => ({
		body: {
			message: 'success',
			result: articles,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	articleRepository.destroy(req.params.uuid).then((articles) => ({
		body: {
			message: 'success',
			result: articles,
		},
	}))
);
