import { ParsedQs } from 'qs';

type Pagination = {
	limit: number;
	page: number;
	currentPage: number;
};

const maxLimit = (limit: string | ParsedQs | string[] | ParsedQs[]) => {
	const numberParsed = Number(limit);

	if (!numberParsed) {
		return 10;
	}

	if (numberParsed > 50) {
		return 50;
	}

	return numberParsed;
};

const pagination = (query: ParsedQs): Pagination => {
	const page = (query.page as unknown as number) || 1;
	const limit = maxLimit(query.limit);

	return {
		limit,
		page: page >= 1 ? page - 1 : page,
		currentPage: Number(page),
	};
};

export default pagination;
