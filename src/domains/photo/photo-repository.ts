import { getRepository } from 'typeorm';
import { Photo } from 'infra/database/entities/Photo';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';

export const index = async (): Promise<Photo[]> => {
	const photoRepository = getRepository(Photo);
	const photos = await photoRepository.find({ relations: ['user'] });
	return photos;
};

export const show = async (uuid: string): Promise<Photo> => {
	const photoRepository = getRepository(Photo);
	const photo = await photoRepository.findOne(uuid);

	if (isNil(photo) || isEmpty(photo)) {
		throw new Error('Photo not found');
	}
	return photo;
};

export const create = async ({ body }: Request): Promise<Photo> => {
	const photoRepository = getRepository(Photo);

	const photo = photoRepository.save({ ...body });

	return photo;
};

export const update = async ({ body, params }: Request): Promise<Photo> => {
	const photoRepository = getRepository(Photo);
	const photo = await photoRepository
		.createQueryBuilder()
		.update({ ...body })
		.where({ id: params.uuid })
		.returning('*')
		.updateEntity(true)
		.execute();

	return photo.raw[0];
};

export const destroy = async (uuid: string): Promise<Photo> => {
	const photoRepository = getRepository(Photo);
	const photo = await photoRepository.softDelete(uuid);

	return photo.raw[0];
};
