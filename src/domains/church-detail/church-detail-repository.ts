import { getRepository } from 'typeorm';
import { ChurchDetail } from 'infra/database/entities/ChurchDetail';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';
import pagination from 'utils/pagination';
import { ParsedQs } from 'qs';
import { RepositoryList } from 'types';

export const index = async (query: ParsedQs): Promise<RepositoryList<ChurchDetail[]>> => {
	const { page, limit, currentPage } = pagination(query);

	const churchDetailRepository = getRepository(ChurchDetail);

	const [data, total] = await churchDetailRepository.findAndCount({
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

export const show = async (uuid: string): Promise<ChurchDetail> => {
	const churchDetailRepository = getRepository(ChurchDetail);
	const churchDetail = await churchDetailRepository.findOne(uuid);

	if (isNil(churchDetail) || isEmpty(churchDetail)) {
		throw new Error('ChurchDetail not found');
	}
	return churchDetail;
};

export const create = async ({ body }: Request): Promise<ChurchDetail> => {
	const churchDetailRepository = getRepository(ChurchDetail);

	const churchDetail = churchDetailRepository.save({ ...body });

	return churchDetail;
};

export const update = async ({ body, params }: Request): Promise<ChurchDetail> => {
	const churchDetailRepository = getRepository(ChurchDetail);
	const churchDetail = await churchDetailRepository
		.createQueryBuilder()
		.update({ ...body })
		.where({ id: params.uuid })
		.returning('*')
		.updateEntity(true)
		.execute();

	return churchDetail.raw[0];
};

export const destroy = async (uuid: string): Promise<ChurchDetail> => {
	const churchDetailRepository = getRepository(ChurchDetail);
	const churchDetail = await churchDetailRepository.softDelete(uuid);

	return churchDetail.raw[0];
};
