import { Request } from 'express';
import * as authorRepository from 'domains/author/author-repository';
import { wrap } from 'utils/wrap';

export const index = wrap(() =>
	authorRepository.index().then((authors) => ({
		body: {
			message: 'success',
			result: authors,
		},
	}))
);

export const show = wrap((req: Request) =>
	authorRepository.show(req.params.uuid).then((authors) => ({
		body: {
			message: 'success',
			result: authors,
		},
	}))
);

export const create = wrap((req: Request) =>
	authorRepository.create(req).then((authors) => ({
		body: {
			message: 'success',
			result: authors,
		},
	}))
);

export const update = wrap((req: Request) =>
	authorRepository.update(req).then((authors) => ({
		body: {
			message: 'success',
			result: authors,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	authorRepository.destroy(req.params.uuid).then((authors) => ({
		body: {
			message: 'success',
			result: authors,
		},
	}))
);
