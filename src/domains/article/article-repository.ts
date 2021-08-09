import { getRepository } from 'typeorm';
import { Article } from 'infra/database/entities/Article';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';
import { ParsedQs } from 'qs';
import pagination from 'utils/pagination';
import { RepositoryList } from 'types';
import { NotFound } from 'app/error';

export const index = async (query: ParsedQs): Promise<RepositoryList<Article[]>> => {
	const { page, limit, currentPage } = pagination(query);

	const articleRepository = getRepository(Article);

	const [data, total] = await articleRepository.findAndCount({
		relations: ['user'],
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

export const show = async (uuid: string): Promise<Article> => {
	const articleRepository = getRepository(Article);

	const article = await articleRepository.findOne(uuid);

	if (isNil(article) || isEmpty(article)) {
		throw new NotFound('Article not found');
	}

	return article;
};

// TODO: Refactor create
export const create = async ({ body }: Request): Promise<Article> => {
	const articleRepository = getRepository(Article);

	const article = articleRepository.save({ ...body });

	return article;
};

// TODO: Refactor
export const update = async ({ body, params }: Request): Promise<Article> => {
	const articleRepository = getRepository(Article);
	const article = await articleRepository
		.createQueryBuilder()
		.update({ ...body })
		.where({ id: params.uuid })
		.returning('*')
		.updateEntity(true)
		.execute();

	return article.raw[0];
};

export const destroy = async (uuid: string): Promise<Article> => {
	const articleRepository = getRepository(Article);
	const article = await articleRepository.softDelete(uuid);

	return article.raw[0];
};
