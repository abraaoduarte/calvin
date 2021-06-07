import { getRepository } from 'typeorm';
import { User } from 'infra/database/entities/User';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';
import { CustomError, NotFound } from 'app/error';

export const index = async (): Promise<User[]> => {
	throw new NotFound('Message teste');
	const userRepository = getRepository(User);
	const users = await userRepository.find();
	return users;
};

export const show = async (uuid: string): Promise<User> => {
	const userRepository = getRepository(User);
	const user = await userRepository.findOne(uuid);

	if (isNil(user) || isEmpty(user)) {
		throw new Error('User not found');
	}
	return user;
};

export const create = async ({ body }: Request): Promise<User> => {
	const userRepository = getRepository(User);

	const user = userRepository.save({ ...body });

	return user;
};

export const update = async ({ body, params }: Request): Promise<User> => {
	const userRepository = getRepository(User);
	const user = await userRepository
		.createQueryBuilder()
		.update({ ...body })
		.where({ id: params.uuid })
		.returning('*')
		.updateEntity(true)
		.execute();

	return user.raw[0];
};

export const destroy = async (uuid: string): Promise<User> => {
	const userRepository = getRepository(User);
	const user = await userRepository.softDelete(uuid);

	return user.raw[0];
};
