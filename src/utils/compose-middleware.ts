import { compose } from 'compose-middleware';

export const composeMiddleware = (...functions) => {
	const middleware = compose(functions);
	return middleware;
};
