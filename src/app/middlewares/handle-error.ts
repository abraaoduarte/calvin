import { Request, Response, NextFunction } from 'express';
import { makeResponseHandler } from 'utils/make-response-handler';
import logger from 'utils/logger';

const unauthorizedCodes = {
	credentials_bad_scheme: 'O formato do header deve ser: Authorization: Bearer [token]',
	credentials_bad_format: 'O formato do header deve ser: Authorization: Bearer [token]',
	credentials_required: 'Token necessário para acessar esta url',
	invalid_token: 'Token inválido',
	revoked_token: 'O token enviado foi revogado',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleError = () => (error, request: Request, response: Response, _: NextFunction) => {
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

	if (error.name === 'UnauthorizedError') {
		logger.error('HANDLED_ERROR:', 'UnauthorizedError');
		return handler({
			status: 401,
			body: {
				message: unauthorizedCodes[error.code] || 'Não foi possível autenticar esta requisição',
				detail: {
					hostname: request.hostname,
					originalUrl: request.originalUrl,
					method: request.method,
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
