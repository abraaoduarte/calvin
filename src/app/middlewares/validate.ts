import { AnyObjectSchema } from 'yup';
import { NextFunction, Request, Response } from 'express';

const isEmptyObject = (value) => Object.keys(value || {}).length === 0;

export const validate =
	(schema: AnyObjectSchema, { query = false, body = false, params = false } = {}, { canBeEmpty = true } = {}) =>
	(request: Request, _: Response, next: NextFunction) => {
		const data = {
			...(query && request.query),
			...(body && request.body),
			...(params && request.params),
		};
		if (!canBeEmpty && isEmptyObject(data)) {
			throw new Error('This request cannot be empty.');
		}
		schema
			.validate(data, { abortEarly: false })
			.then(() => next())
			.catch((error) => next(error));
	};

validate.body = (schema: AnyObjectSchema, options) => validate(schema, { body: true, query: false }, options);
validate.data = (schema: AnyObjectSchema, options) => validate(schema, { body: true, query: true }, options);
validate.params = (schema: AnyObjectSchema, options) => validate(schema, { params: true }, options);
validate.all = (schema: AnyObjectSchema, options) =>
	validate(schema, { body: true, query: true, params: true }, options);
