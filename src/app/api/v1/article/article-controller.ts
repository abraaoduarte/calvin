import { Request } from 'express';
import * as articleRepository from 'domains/article/article-repository';
import { wrap } from 'utils/wrap';
import { CustomRequest } from 'types/CustomRequest';

export const index = wrap((req: Request) =>
	articleRepository.index(req.query).then((articles) => ({
		body: {
			message: 'success',
			...articles,
		},
	}))
);

export const show = wrap((req: Request) =>
	articleRepository.show(req.params.uuid).then((article) => ({
		body: {
			message: 'success',
			result: article,
		},
	}))
);

export const create = wrap((req: CustomRequest) =>
	articleRepository.create(req).then((article) => ({
		body: {
			message: 'success',
			result: article,
		},
	}))
);

export const update = wrap((req: CustomRequest) =>
	articleRepository.update(req).then((article) => ({
		body: {
			message: 'success',
			result: article,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	articleRepository.destroy(req.params.uuid).then(() => ({
		body: {
			message: 'success',
		},
	}))
);
