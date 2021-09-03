import { getRepository } from 'typeorm';
import { Tag } from 'infra/database/entities/Tag';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';
import pagination from 'utils/pagination';
import { ParsedQs } from 'qs';
import { RepositoryList } from 'types';

export const index = async (query: ParsedQs): Promise<RepositoryList<Tag[]>> => {
	const { page, limit, currentPage } = pagination(query);

	const tagRepository = getRepository(Tag);

	const [data, total] = await tagRepository.findAndCount({
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

export const show = async (uuid: string): Promise<Tag> => {
	const tagRepository = getRepository(Tag);
	const tag = await tagRepository.findOne(uuid);

	if (isNil(tag) || isEmpty(tag)) {
		throw new Error('Tag not found');
	}
	return tag;
};

export const create = async ({ body }: Request): Promise<Tag> => {
	const tagRepository = getRepository(Tag);

	const tag = tagRepository.save({ ...body });

	return tag;
};

export const update = async ({ body, params }: Request): Promise<Tag> => {
	const tagRepository = getRepository(Tag);
	const tag = await tagRepository
		.createQueryBuilder()
		.update({ ...body })
		.where({ id: params.uuid })
		.returning('*')
		.updateEntity(true)
		.execute();

	return tag.raw[0];
};

export const destroy = async (uuid: string): Promise<Tag> => {
	const tagRepository = getRepository(Tag);
	const tag = await tagRepository.softDelete(uuid);

	return tag.raw[0];
};
