import { getRepository } from 'typeorm';
import { Article } from 'infra/database/entities/Article';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';

export const index = async (): Promise<Article[]> => {
	const articleRepository = getRepository(Article);
	const articles = await articleRepository.find({ relations: ['user'] });
	return articles;
};

export const show = async (uuid: string): Promise<Article> => {
	const articleRepository = getRepository(Article);
	const article = await articleRepository.findOne(uuid);

	if (isNil(article) || isEmpty(article)) {
		throw new Error('Article not found');
	}
	return article;
};

export const create = async ({ body }: Request): Promise<Article> => {
	const articleRepository = getRepository(Article);

	const article = articleRepository.save({ ...body });

	return article;
};

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
