import { getRepository } from 'typeorm';
import { Article } from 'infra/database/entities/Article';
import { isEmpty, isNil } from 'ramda';
import { ParsedQs } from 'qs';
import pagination from 'utils/pagination';
import { RepositoryList } from 'types';
import { BadRequest, NotFound } from 'app/error';
import { CustomRequest } from 'types/CustomRequest';

export const findBySlug = async (slug: string): Promise<Article> => {
	const articleRepository = getRepository(Article);

	const article = articleRepository.findOne({ slug });

	return article;
};

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

export const create = async (request: CustomRequest): Promise<Article> => {
	const articleRepository = getRepository(Article);

	const { body } = request;

	const { slug } = body;

	const articleBySlug = await findBySlug(slug);

	const emailBeingUsed = isNil(articleBySlug) || isEmpty(articleBySlug);
	if (!emailBeingUsed) {
		throw new BadRequest('This slug is already being used.');
	}

	const userId = request.payload.data.user;

	const newArticle = articleRepository.create({ ...body, user: userId } as Article);

	const article = await articleRepository.save(newArticle);

	return article;
};

export const update = async ({ body, params, payload }: CustomRequest): Promise<Article> => {
	const { slug } = body;

	const articleRepository = getRepository(Article);

	const articleBySlug = await findBySlug(slug);

	if (!isNil(articleBySlug) && articleBySlug.id !== params.uuid) {
		throw new BadRequest('This slug is already being used.');
	}

	const userId = payload.data.user;

	const updatedArticle = articleRepository.create({ ...body, id: params.uuid, user: userId } as Article);

	const article = await articleRepository.save(updatedArticle);

	return article;
};

export const destroy = async (uuid: string): Promise<Article> => {
	const articleRepository = getRepository(Article);

	const article = await articleRepository.softDelete(uuid);

	return article.raw[0];
};
