import { Request, Response } from 'express';
import * as userRepository from 'domains/user/user-repository';
import logger from 'utils/logger';
import { wrap } from 'utils/wrap';

export const index = wrap(() =>
	userRepository.index().then((users) => ({
		body: {
			message: 'success',
			result: users,
		},
	}))
);

export const show = (req: Request, res: Response) =>
	userRepository
		.show(req.params.uuid)
		.then((result) => {
			res.send({ ...result });
		})
		.catch((error) => {
			logger.error('error', error);
			res.status(500).send({ error: error.message });
		});

export const create = wrap((req: Request) => userRepository.create(req));

export const update = (req: Request, res: Response) =>
	userRepository
		.update(req)
		.then((result) => {
			res.send({ ...result });
		})
		.catch((error) => {
			logger.error('error', error);
			res.status(500).send({ error: error.message });
		});

export const destroy = (req: Request, res: Response) =>
	userRepository
		.destroy(req.params.uuid)
		.then((result) => {
			res.send({ ...result });
		})
		.catch((error) => {
			logger.error('error', error);
			res.status(500).send({ error: error.message });
		});
