import { Request, Response } from 'express';

export const index = (_: Request, res: Response): void => {
	res.json('Test response');
};

export const create = (_: Request, res: Response): void => {
	res.json('Test create');
};
