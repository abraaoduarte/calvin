import yup from 'utils/yup';

export const makeUuidSchema = (key) =>
	yup.object().shape({
		[key]: yup.string().uuid().required(),
	});
