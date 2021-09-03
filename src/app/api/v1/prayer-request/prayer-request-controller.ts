import { Request } from 'express';
import * as prayerRequestRepository from 'domains/tag/tag-repository';
import { wrap } from 'utils/wrap';

export const index = wrap((req: Request) =>
	prayerRequestRepository.index(req.query).then((prayerRequests) => ({
			body: {
				message: 'success',
				...prayerRequests,
			},
		})
	)
);

export const show = wrap((req: Request) =>
	prayerRequestRepository.show(req.params.uuid).then((prayerRequests) => ({
		body: {
			message: 'success',
			result: prayerRequests,
		},
	}))
);

export const create = wrap((req: Request) =>
	prayerRequestRepository.create(req).then((prayerRequests) => ({
		body: {
			message: 'success',
			result: prayerRequests,
		},
	}))
);

export const update = wrap((req: Request) =>
	prayerRequestRepository.update(req).then((prayerRequests) => ({
		body: {
			message: 'success',
			result: prayerRequests,
		},
	}))
);

export const destroy = wrap((req: Request) =>
	prayerRequestRepository.destroy(req.params.uuid).then((prayerRequests) => ({
		body: {
			message: 'success',
			result: prayerRequests,
		},
	}))
);
