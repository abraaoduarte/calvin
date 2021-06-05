import { Request, Response } from 'express';
import * as userRepository from 'domains/user/user-repository';
import logger from 'utils/logger';
import { wrap } from 'utils/wrap';
import { responder } from 'utils/responder';

// export const index = (_: Request, res: Response) =>
// 	userRepository
// 		.index()
// 		.then((result) => {
// 			res.send({ ...result });
// 		})
// 		.catch((error) => {
// 			logger.error('error', error);
// 			res.status(500).send({ error: error.message });
// 		});

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

// export const create = (req: Request, res: Response, next) =>
// 	userRepository
// 		.create(req)
// 		.then((result) => {
// 			res.send({ ...result });
// 		})
// 		.catch((error) => {
// 			// next(error)
// 			console.log('error', error);
// 			res.status(error.status).json({
// 				message: error.message,
// 			});
// 		});

export const index = wrap(() =>
	userRepository.index().then((result) => ({
		body: responder({ result }),
	}))
);
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
