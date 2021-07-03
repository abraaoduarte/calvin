import { getRepository } from 'typeorm';
import { BankDetail } from 'infra/database/entities/BankDetail';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';

export const index = async (): Promise<BankDetail[]> => {
	const bankDetailRepository = getRepository(BankDetail);
	const bankDetails = await bankDetailRepository.find({ relations: ['user'] });
	return bankDetails;
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
