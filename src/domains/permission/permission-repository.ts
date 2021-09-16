import { getRepository } from 'typeorm';
import { Permission } from 'infra/database/entities/Permission';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';
import pagination from 'utils/pagination';
import { ParsedQs } from 'qs';
import { RepositoryList } from 'types';

export const index = async (query: ParsedQs): Promise<RepositoryList<Permission[]>> => {
	const { page, limit, currentPage } = pagination(query);

	const permissionRepository = getRepository(Permission);

	const [data, total] = await permissionRepository.findAndCount({
		relations: ['roles', 'users'],
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

export const show = async (uuid: string): Promise<Permission> => {
	const permissionRepository = getRepository(Permission);
	const permission = await permissionRepository.findOne(uuid);

	if (isNil(permission) || isEmpty(permission)) {
		throw new Error('Permission not found');
	}
	return permission;
};

export const create = async ({ body }: Request): Promise<Permission> => {
	const permissionRepository = getRepository(Permission);

	const permission = permissionRepository.save({ ...body });

	return permission;
};

export const update = async ({ body, params }: Request): Promise<Permission> => {
	const permissionRepository = getRepository(Permission);
	const permission = await permissionRepository
		.createQueryBuilder()
		.update({ ...body })
		.where({ id: params.uuid })
		.returning('*')
		.updateEntity(true)
		.execute();

	return permission.raw[0];
};

export const destroy = async (uuid: string): Promise<Permission> => {
	const permissionRepository = getRepository(Permission);
	const permission = await permissionRepository.softDelete(uuid);

	return permission.raw[0];
};
