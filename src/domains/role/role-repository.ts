import { getRepository } from 'typeorm';
import { Role } from 'infra/database/entities/Role';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';
import pagination from 'utils/pagination';
import { ParsedQs } from 'qs';
import { RepositoryList } from 'types';

export const index = async (query: ParsedQs): Promise<RepositoryList<Role[]>> => {
	const { page, limit, currentPage } = pagination(query);

	const roleRepository = getRepository(Role);

	const [data, total] = await roleRepository.findAndCount({
		relations: ['users', 'permissions'],
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

export const show = async (uuid: string): Promise<Role> => {
	const roleRepository = getRepository(Role);
	const role = await roleRepository.findOne(uuid);

	if (isNil(role) || isEmpty(role)) {
		throw new Error('Role not found');
	}
	return role;
};

export const create = async ({ body }: Request): Promise<Role> => {
	const roleRepository = getRepository(Role);

	const role = roleRepository.save({ ...body });

	return role;
};

export const update = async ({ body, params }: Request): Promise<Role> => {
	const roleRepository = getRepository(Role);
	const role = await roleRepository
		.createQueryBuilder()
		.update({ ...body })
		.where({ id: params.uuid })
		.returning('*')
		.updateEntity(true)
		.execute();

	return role.raw[0];
};

export const destroy = async (uuid: string): Promise<Role> => {
	const roleRepository = getRepository(Role);
	const role = await roleRepository.softDelete(uuid);

	return role.raw[0];
};
