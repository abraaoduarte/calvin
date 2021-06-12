import { getRepository } from 'typeorm';
import { Permission } from 'infra/database/entities/Permission';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';

export const index = async (): Promise<Permission[]> => {
	const permissionRepository = getRepository(Permission);
	const permissions = await permissionRepository.find();
	return permissions;
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
