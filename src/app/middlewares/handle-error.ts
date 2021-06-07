import { Request, Response, NextFunction } from 'express';
import { makeResponseHandler } from 'utils/make-response-handler';
import logger from 'utils/logger';

const handleError = () => (error, _: Request, response: Response, next: NextFunction) => {
	const handler = makeResponseHandler(response);
	logger.error(error);

	if (error.response) {
		logger.error('HANDLED_ERROR:', error.name);
		return handler(error.response());
	}

	if (error.name === 'ValidationError' && error.value) {
		logger.error('HANDLED_ERROR:', error.name);
		return handler({
			status: 400,
			body: {
				message: `Ocorreram ${error.errors.length} erros de validação. Corrija-os e tente novamente.`,
				detail: {
					errors: error.inner,
					messages: error.errors,
				},
			},
		});
	}

	logger.error('UNHANDLED_ERROR:', error.name);
	return handler({
		status: 500,
		body: {
			detail: {
				name: error.name,
				message: error.message,
			},
		},
	});
};

export { handleError };
