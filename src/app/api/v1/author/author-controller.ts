import { Request } from 'express';
import * as authorRepository from 'domains/author/author-repository';
import { wrap } from 'utils/wrap';
import { CustomRequest } from 'types/CustomRequest';

export const index = wrap(() =>
	authorRepository.index().then((author) => ({
		body: {
			message: 'success',
			result: author,
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

export const create = wrap((req: CustomRequest) =>
	authorRepository.create(req).then((author) => ({
		body: {
			message: 'success',
			result: author,
		},
	}))
);

export const update = wrap((req: CustomRequest) =>
	authorRepository.update(req).then((author) => ({
		body: {
			message: 'success',
			result: author,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	authorRepository.destroy(req.params.uuid).then(() => ({
		body: {
			message: 'success',
		},
	}))
);
