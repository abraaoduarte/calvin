import { getRepository } from 'typeorm';
import { Event } from 'infra/database/entities/Event';
import { isEmpty, isNil } from 'ramda';
import { Request } from 'express';

export const index = async (): Promise<Event[]> => {
	const eventRepository = getRepository(Event);
	const events = await eventRepository.find({ relations: ['user'] });
	return events;
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
