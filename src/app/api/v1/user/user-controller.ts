import { Request, Response } from 'express';
import * as userRepository from 'domains/user/user-repository';
import logger from 'utils/logger';

export const index = (_: Request, res: Response) =>
	userRepository
		.index()
		.then((result) => {
			res.send({ ...result });
		})
		.catch((error) => {
			logger.error('error', error);
			res.status(500).send({ error: error.message });
		});

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

export const create = (req: Request, res: Response) =>
	userRepository
		.create(req)
		.then((result) => {
			res.send({ ...result });
		})
		.catch((error) => {
			logger.error('error', error);
			res.status(500).send({ error: error.message });
		});

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
