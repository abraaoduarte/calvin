class Unauthorized extends Error {
	constructor(message: string) {
		super();
		this.name = 'Unauthorized';
		this.message = message || 'Não foi possível realizar autenticação';
	}

	response() {
		return {
			status: 401,
			body: {
				message: this.message,
			},
		};
	}
}

export { Unauthorized };
