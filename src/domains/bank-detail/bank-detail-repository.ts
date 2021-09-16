import { getRepository } from 'typeorm';
import { BankDetail } from 'infra/database/entities/BankDetail';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';
import pagination from 'utils/pagination';
import { ParsedQs } from 'qs';
import { RepositoryList } from 'types';

export const index = async (query: ParsedQs): Promise<RepositoryList<BankDetail[]>> => {
	const { page, limit, currentPage } = pagination(query);

	const bankDetailsRepository = getRepository(BankDetail);

	const [data, total] = await bankDetailsRepository.findAndCount({
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

export const show = async (uuid: string): Promise<BankDetail> => {
	const bankDetailRepository = getRepository(BankDetail);

	const bankDetail = await bankDetailRepository.findOne(uuid);

	if (isNil(bankDetail) || isEmpty(bankDetail)) {
		throw new Error('BankDetail not found');
	}

	return bankDetail;
};

export const create = async ({ body }: Request): Promise<BankDetail> => {
	const bankDetailRepository = getRepository(BankDetail);

	const bankDetail = bankDetailRepository.save({ ...body });

	return bankDetail;
};

export const update = async ({ body, params }: Request): Promise<BankDetail> => {
	const bankDetailRepository = getRepository(BankDetail);
	const bankDetail = await bankDetailRepository
		.createQueryBuilder()
		.update({ ...body })
		.where({ id: params.uuid })
		.returning('*')
		.updateEntity(true)
		.execute();

	return bankDetail.raw[0];
};

export const destroy = async (uuid: string): Promise<BankDetail> => {
	const bankDetailRepository = getRepository(BankDetail);
	const bankDetail = await bankDetailRepository.softDelete(uuid);

	return bankDetail.raw[0];
};
