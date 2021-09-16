import { getRepository } from 'typeorm';
import { PrayerRequest } from 'infra/database/entities/PrayerRequest';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';
import pagination from 'utils/pagination';
import { ParsedQs } from 'qs';
import { RepositoryList } from 'types';

export const index = async (query: ParsedQs): Promise<RepositoryList<PrayerRequest[]>> => {
	const { page, limit, currentPage } = pagination(query);

	const prayerRequestRepository = getRepository(PrayerRequest);

	const [data, total] = await prayerRequestRepository.findAndCount({
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

export const show = async (uuid: string): Promise<PrayerRequest> => {
	const prayerRequestRepository = getRepository(PrayerRequest);
	const prayerRequest = await prayerRequestRepository.findOne(uuid);

	if (isNil(prayerRequest) || isEmpty(prayerRequest)) {
		throw new Error('PrayerRequest not found');
	}
	return prayerRequest;
};

export const create = async ({ body }: Request): Promise<PrayerRequest> => {
	const prayerRequestRepository = getRepository(PrayerRequest);

	const prayerRequest = prayerRequestRepository.save({ ...body });

	return prayerRequest;
};

export const update = async ({ body, params }: Request): Promise<PrayerRequest> => {
	const prayerRequestRepository = getRepository(PrayerRequest);
	const prayerRequest = await prayerRequestRepository
		.createQueryBuilder()
		.update({ ...body })
		.where({ id: params.uuid })
		.returning('*')
		.updateEntity(true)
		.execute();

	return prayerRequest.raw[0];
};

export const destroy = async (uuid: string): Promise<PrayerRequest> => {
	const prayerRequestRepository = getRepository(PrayerRequest);
	const prayerRequest = await prayerRequestRepository.softDelete(uuid);

	return prayerRequest.raw[0];
};
