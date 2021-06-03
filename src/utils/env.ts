require('dotenv').config();

const isNullOrUndefined = (value?: string) => typeof value === 'undefined' || value === null;

type DefaultValue = string;

const env = (key: string, defaultValue?: DefaultValue): string => {
	const value = process.env[key];

	const valueWhenEmpty = defaultValue || '';

	if (isNullOrUndefined(value)) {
		return valueWhenEmpty;
	}

	return value;
};

export default env;
