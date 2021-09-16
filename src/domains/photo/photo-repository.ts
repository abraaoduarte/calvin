import { getRepository } from 'typeorm';
import { Photo } from 'infra/database/entities/Photo';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';
import pagination from 'utils/pagination';
import { ParsedQs } from 'qs';
import { RepositoryList } from 'types';

export const index = async (query: ParsedQs): Promise<RepositoryList<Photo[]>> => {
	const { page, limit, currentPage } = pagination(query);

	const photoRepository = getRepository(Photo);

	const [data, total] = await photoRepository.findAndCount({
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

export const show = async (uuid: string): Promise<Photo> => {
	const photoRepository = getRepository(Photo);
	const photo = await photoRepository.findOne(uuid);

	if (isNil(photo) || isEmpty(photo)) {
		throw new Error('Photo not found');
	}
	return photo;
};

export const create = async ({ body }: Request): Promise<Photo> => {
	const photoRepository = getRepository(Photo);

	const photo = photoRepository.save({ ...body });

	return photo;
};

export const update = async ({ body, params }: Request): Promise<Photo> => {
	const photoRepository = getRepository(Photo);
	const photo = await photoRepository
		.createQueryBuilder()
		.update({ ...body })
		.where({ id: params.uuid })
		.returning('*')
		.updateEntity(true)
		.execute();

	return photo.raw[0];
};

export const destroy = async (uuid: string): Promise<Photo> => {
	const photoRepository = getRepository(Photo);
	const photo = await photoRepository.softDelete(uuid);

	return photo.raw[0];
};
