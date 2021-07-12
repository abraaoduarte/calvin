class BadRequest extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'BadRequest';
		this.message = message || 'Bad request';
	}

	response() {
		return {
			status: 400,
			body: {
				name: this.name,
				message: this.message,
			},
		};
	}
}

export { BadRequest };
