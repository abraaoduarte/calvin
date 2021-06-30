import { getRepository } from 'typeorm';
import { Author } from 'infra/database/entities/Author';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';

export const index = async (): Promise<Author[]> => {
	const authorRepository = getRepository(Author);
	const authors = await authorRepository.find({ relations: ['user'] });
	return authors;
};

export const show = async (uuid: string): Promise<Author> => {
	const authorRepository = getRepository(Author);
	const author = await authorRepository.findOne(uuid);

	if (isNil(author) || isEmpty(author)) {
		throw new Error('Author not found');
	}
	return author;
};

export const create = async ({ body }: Request): Promise<Author> => {
	const authorRepository = getRepository(Author);

	const author = authorRepository.save({ ...body });

	return author;
};

export const update = async ({ body, params }: Request): Promise<Author> => {
	const authorRepository = getRepository(Author);
	const author = await authorRepository
		.createQueryBuilder()
		.update({ ...body })
		.where({ id: params.uuid })
		.returning('*')
		.updateEntity(true)
		.execute();

	return author.raw[0];
};

export const destroy = async (uuid: string): Promise<Author> => {
	const authorRepository = getRepository(Author);
	const author = await authorRepository.softDelete(uuid);

	return author.raw[0];
};
