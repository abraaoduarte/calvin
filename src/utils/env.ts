require('dotenv').config();

const isNullOrUndefined = (value?: string) => typeof value === 'undefined' || value === null;

type DefaultValue = string | number;

const env = (key = '', defaultValue: DefaultValue): DefaultValue => {
	const value = process.env[key];

	return isNullOrUndefined(value) ? defaultValue : value!;
};

export default env;
