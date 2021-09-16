import { getRepository } from 'typeorm';
import { Quote } from 'infra/database/entities/Quote';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';
import pagination from 'utils/pagination';
import { ParsedQs } from 'qs';
import { RepositoryList } from 'types';

export const index = async (query: ParsedQs): Promise<RepositoryList<Quote[]>> => {
	const { page, limit, currentPage } = pagination(query);

	const quoteRepository = getRepository(Quote);

	const [data, total] = await quoteRepository.findAndCount({
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

export const show = async (uuid: string): Promise<Quote> => {
	const quoteRepository = getRepository(Quote);
	const quote = await quoteRepository.findOne(uuid);

	if (isNil(quote) || isEmpty(quote)) {
		throw new Error('Quote not found');
	}
	return quote;
};

export const create = async ({ body }: Request): Promise<Quote> => {
	const quoteRepository = getRepository(Quote);

	const quote = quoteRepository.save({ ...body });

	return quote;
};

export const update = async ({ body, params }: Request): Promise<Quote> => {
	const quoteRepository = getRepository(Quote);
	const quote = await quoteRepository
		.createQueryBuilder()
		.update({ ...body })
		.where({ id: params.uuid })
		.returning('*')
		.updateEntity(true)
		.execute();

	return quote.raw[0];
};

export const destroy = async (uuid: string): Promise<Quote> => {
	const quoteRepository = getRepository(Quote);
	const quote = await quoteRepository.softDelete(uuid);

	return quote.raw[0];
};
