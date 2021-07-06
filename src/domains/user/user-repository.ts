import { getRepository } from 'typeorm';
import { User } from 'infra/database/entities/User';
import { isEmpty, isNil, omit } from 'ramda';
import { Request } from 'express';
import { BadRequest } from 'app/error';
import bcrypt from 'bcrypt';

const generateHash = (password: string) => {
	const saltRounds = 10;
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
};

export const index = async (): Promise<User[]> => {
	const userRepository = getRepository(User);
	const users = await userRepository.find({ relations: ['roles', 'permissions'] });
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

export const findByEmail = async (email: string): Promise<User> => {
	const userRepository = getRepository(User);

	const user = userRepository.findOne({ email });

	return user;
};

export const create = async ({ body }: Request): Promise<User> => {
	const userRepository = getRepository(User);

	const { email, password } = body;

	const userByEmail = await findByEmail(email);

	const emailBeingUsed = isNil(userByEmail) || isEmpty(userByEmail);

	if (!emailBeingUsed) {
		throw new BadRequest('Este email já está sendo utilizado.');
	}

	const passwordEncrypted = generateHash(password);

	const user = await userRepository.save({ ...omit(['passwordConfirmation'], body), password: passwordEncrypted });

	return omit(['password'], user);
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
