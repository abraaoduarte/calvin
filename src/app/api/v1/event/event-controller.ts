import { Request } from 'express';
import * as eventRepository from 'domains/event/event-repository';
import { wrap } from 'utils/wrap';

export const index = wrap((req: Request) =>
	eventRepository.index(req.query).then((events) => ({
			body: {
				message: 'success',
				...events,
			},
		})
	)
);

export const show = wrap((req: Request) =>
	eventRepository.show(req.params.uuid).then((event) => ({
		body: {
			message: 'success',
			result: event,
		},
	}))
);

export const create = wrap((req: Request) =>
	eventRepository.create(req).then((event) => ({
		body: {
			message: 'success',
			result: event,
		},
	}))
);

export const update = wrap((req: Request) =>
	eventRepository.update(req).then((event) => ({
		body: {
			message: 'success',
			result: event,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	eventRepository.destroy(req.params.uuid).then((event) => ({
		body: {
			message: 'success',
			result: event,
		},
	}))
);
