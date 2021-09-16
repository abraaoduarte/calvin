import { getRepository } from 'typeorm';
import { Banner } from 'infra/database/entities/Banner';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';
import pagination from 'utils/pagination';
import { ParsedQs } from 'qs';
import { RepositoryList } from 'types';

export const index = async (query: ParsedQs): Promise<RepositoryList<Banner[]>> => {
	const { page, limit, currentPage } = pagination(query);

	const bannerRepository = getRepository(Banner);

	const [data, total] = await bannerRepository.findAndCount({
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

export const show = async (uuid: string): Promise<Banner> => {
	const bannerRepository = getRepository(Banner);
	const banner = await bannerRepository.findOne(uuid);

	if (isNil(banner) || isEmpty(banner)) {
		throw new Error('Banner not found');
	}
	return banner;
};

export const create = async ({ body }: Request): Promise<Banner> => {
	const bannerRepository = getRepository(Banner);

	const banner = bannerRepository.save({ ...body });

	return banner;
};

export const update = async ({ body, params }: Request): Promise<Banner> => {
	const bannerRepository = getRepository(Banner);
	const banner = await bannerRepository
		.createQueryBuilder()
		.update({ ...body })
		.where({ id: params.uuid })
		.returning('*')
		.updateEntity(true)
		.execute();

	return banner.raw[0];
};

export const destroy = async (uuid: string): Promise<Banner> => {
	const bannerRepository = getRepository(Banner);
	const banner = await bannerRepository.softDelete(uuid);

	return banner.raw[0];
};
