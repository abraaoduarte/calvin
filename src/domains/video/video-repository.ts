import { getRepository } from 'typeorm';
import { Video } from 'infra/database/entities/Video';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';
import pagination from 'utils/pagination';
import { ParsedQs } from 'qs';
import { RepositoryList } from 'types';

export const index = async (query: ParsedQs): Promise<RepositoryList<Video[]>> => {
	const { page, limit, currentPage } = pagination(query);

	const videoRepository = getRepository(Video);

	const [data, total] = await videoRepository.findAndCount({
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

export const show = async (uuid: string): Promise<Video> => {
	const videoRepository = getRepository(Video);
	const video = await videoRepository.findOne(uuid);

	if (isNil(video) || isEmpty(video)) {
		throw new Error('Video not found');
	}
	return video;
};

export const create = async ({ body }: Request): Promise<Video> => {
	const videoRepository = getRepository(Video);

	const video = videoRepository.save({ ...body });

	return video;
};

export const update = async ({ body, params }: Request): Promise<Video> => {
	const videoRepository = getRepository(Video);
	const video = await videoRepository
		.createQueryBuilder()
		.update({ ...body })
		.where({ id: params.uuid })
		.returning('*')
		.updateEntity(true)
		.execute();

	return video.raw[0];
};

export const destroy = async (uuid: string): Promise<Video> => {
	const videoRepository = getRepository(Video);
	const video = await videoRepository.softDelete(uuid);

	return video.raw[0];
};
