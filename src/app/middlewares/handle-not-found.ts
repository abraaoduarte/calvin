const handleNotFound = () => (request, response) =>
	response.json({
		message: 'This route does not exist',
		detail: {
			hostname: request.hostname,
			originalUrl: request.originalUrl,
			method: request.method,
		},
	});

export { handleNotFound };
