import { getRepository } from 'typeorm';
import { User } from 'infra/database/entities/User';
import { isEmpty, isNil, omit } from 'ramda';
import { Request } from 'express';
import { BadRequest, NotFound } from 'app/error';
import pagination from 'utils/pagination';
import { ParsedQs } from 'qs';
import { RepositoryList } from 'types';

export const index = async (query: ParsedQs): Promise<RepositoryList<User[]>> => {
	const { page, limit, currentPage } = pagination(query);

	const userRepository = getRepository(User);

	const [data, total] = await userRepository.findAndCount({
		relations: ['roles', 'permissions'],
		skip: page * limit,
		take: limit,
	});

	return {
		result: data,
		total,
		pages: Math.ceil(total / limit),
		currentPage,
	};
};

export const show = async (uuid: string): Promise<User> => {
	const userRepository = getRepository(User);
	const user = await userRepository.findOne(uuid);

	if (isNil(user) || isEmpty(user)) {
		throw new NotFound('User not found');
	}
	return user;
};

export const findByEmail = async (email: string): Promise<User> => {
	const userRepository = getRepository(User);

	const user = userRepository.findOne({ email });

	return user;
};

export const create = async ({ body }: Request): Promise<User> => {
	const userRepository = getRepository(User);

	const { email } = body;

	const userByEmail = await findByEmail(email);

	const emailBeingUsed = isNil(userByEmail) || isEmpty(userByEmail);
	if (!emailBeingUsed) {
		throw new BadRequest('This email is already being used.');
	}

	const newUser = userRepository.create({ ...body } as User);

	const user = await userRepository.save(newUser);

	return omit(['password'], user);
};

export const update = async ({ body, params }: Request): Promise<User> => {
	const { email } = body;

	const userRepository = getRepository(User);

	const userByEmail = await findByEmail(email);

	if (!isNil(userByEmail) && userByEmail.id !== params.uuid) {
		throw new BadRequest('This email is already being used.');
	}

	const updatedUser = userRepository.create({ ...body, id: params.uuid } as User);

	const user = await userRepository.save(updatedUser);

	return omit(['password'], user);
};

export const destroy = async (uuid: string): Promise<User> => {
	const userRepository = getRepository(User);

	const user = await userRepository.softDelete(uuid);

	return user.raw[0];
};

export const findUserByUuid = async (uuid: string) => {
	const userRepository = getRepository(User);

	const user = await userRepository.findOne({ id: uuid });

	if (isNil(user) || isEmpty(user)) {
		throw new NotFound('User not found');
	}
	return user;
};
