type Repository<T> = T;

export type RepositoryList<T> = {
	result: Repository<T>;
	total: number;
	currentPage: number;
	pages: number;
};
