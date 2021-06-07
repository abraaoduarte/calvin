import { getRepository } from 'typeorm';
import { Role } from 'infra/database/entities/Role';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';

export const index = async (): Promise<Role[]> => {
	const roleRepository = getRepository(Role);
	const roles = await roleRepository.find();
	return roles;
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
