import { getRepository } from 'typeorm';
import { Author } from 'infra/database/entities/Author';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';
import pagination from 'utils/pagination';
import { ParsedQs } from 'qs';
import { RepositoryList } from 'types';

export const index = async (query: ParsedQs): Promise<RepositoryList<Author[]>> => {
	const { page, limit, currentPage } = pagination(query);

	const articleRepository = getRepository(Author);

	const [data, total] = await articleRepository.findAndCount({
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

	const newAuthor = authorRepository.create({ ...body } as Author);

	const author = await authorRepository.save(newAuthor);

	return author;
};

export const update = async ({ body, params }: Request): Promise<Author> => {
	const authorRepository = getRepository(Author);

	const updateAuthor = authorRepository.create({ ...body, id: params.uuid } as Author);

	const author = await authorRepository.save(updateAuthor);

	return author;
};

export const destroy = async (uuid: string): Promise<Author> => {
	const authorRepository = getRepository(Author);

	const author = await authorRepository.softDelete(uuid);

	return author.raw[0];
};
