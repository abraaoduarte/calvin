import { getRepository } from 'typeorm';
import { Event } from 'infra/database/entities/Event';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';
import pagination from 'utils/pagination';
import { ParsedQs } from 'qs';
import { RepositoryList } from 'types';

export const index = async (query: ParsedQs): Promise<RepositoryList<Event[]>> => {
	const { page, limit, currentPage } = pagination(query);

	const eventRepository = getRepository(Event);

	const [data, total] = await eventRepository.findAndCount({
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

export const show = async (uuid: string): Promise<Event> => {
	const eventRepository = getRepository(Event);
	const event = await eventRepository.findOne(uuid);

	if (isNil(event) || isEmpty(event)) {
		throw new Error('Event not found');
	}
	return event;
};

export const create = async ({ body }: Request): Promise<Event> => {
	const eventRepository = getRepository(Event);

	const event = eventRepository.save({ ...body });

	return event;
};

export const update = async ({ body, params }: Request): Promise<Event> => {
	const eventRepository = getRepository(Event);
	const event = await eventRepository
		.createQueryBuilder()
		.update({ ...body })
		.where({ id: params.uuid })
		.returning('*')
		.updateEntity(true)
		.execute();

	return event.raw[0];
};

export const destroy = async (uuid: string): Promise<Event> => {
	const eventRepository = getRepository(Event);
	const event = await eventRepository.softDelete(uuid);

	return event.raw[0];
};
