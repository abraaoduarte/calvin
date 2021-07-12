import jwt from 'jsonwebtoken';
import { Request } from 'express';
import env from 'utils/env';
import { findByEmail, findUserByUuid } from 'domains/user/user-repository';
import { isEmpty, isNil, omit } from 'ramda';
import { Unauthorized } from 'app/error';
import bcrypt from 'bcrypt';

const TOKEN_DURATION = '4h';

export const makeToken = (id: string) =>
	jwt.sign({ data: { user: id } }, env('APP_SECRET'), { expiresIn: TOKEN_DURATION });

export const compare = (password: string, hash: string) => bcrypt.compare(password, hash);

export const login = async ({ body }: Request) => {
	const { email, password } = body;
	const user = await findByEmail(email);

	if (isNil(user) || isEmpty(user)) {
		throw new Unauthorized('Email e/ou senha incorretos. Verifique os dados e tente novamente.');
	}

	const isValid = await compare(password, user.password);

	if (!isValid) {
		throw new Unauthorized('Email e/ou senha incorretos. Verifique os dados e tente novamente.');
	}

	return {
		user: omit(['password'], user),
		token: makeToken(user.id),
		duration: TOKEN_DURATION,
	};
};

export const refresh = async ({ body }: Request) => {
	const { id } = body;

	const user = await findUserByUuid(id);

	if (isNil(user) || isEmpty(user)) {
		throw new Unauthorized('Não é possível atualizar token pois o usuário já não existe mais.');
	}

	return {
		user,
		token: makeToken(id),
		duration: TOKEN_DURATION,
	};
};
