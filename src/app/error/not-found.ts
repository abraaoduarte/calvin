class NotFound extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'NotFound';
		this.message = message || 'Not found';
	}

	response() {
		return {
			status: 404,
			body: {
				name: this.name,
				message: this.message,
			},
		};
	}
}

export { NotFound };
