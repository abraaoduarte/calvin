type StatusCode = string | number;

class CustomError extends Error {
	statusCode: StatusCode;

	constructor(message: string, status: StatusCode) {
		super();
		this.message = message;
		this.statusCode = status;
	}
}

export { CustomError };
