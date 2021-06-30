import { Request } from 'express';
import * as quoteRepository from 'domains/quote/quote-repository';
import { wrap } from 'utils/wrap';

export const index = wrap(() =>
	quoteRepository.index().then((quote) => ({
		body: {
			message: 'success',
			result: quote,
		},
	}))
);

export const show = wrap((req: Request) =>
	quoteRepository.show(req.params.uuid).then((quote) => ({
		body: {
			message: 'success',
			result: quote,
		},
	}))
);

export const create = wrap((req: Request) =>
	quoteRepository.create(req).then((quote) => ({
		body: {
			message: 'success',
			result: quote,
		},
	}))
);

export const update = wrap((req: Request) =>
	quoteRepository.update(req).then((quote) => ({
		body: {
			message: 'success',
			result: quote,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	quoteRepository.destroy(req.params.uuid).then((quote) => ({
		body: {
			message: 'success',
			result: quote,
		},
	}))
);
