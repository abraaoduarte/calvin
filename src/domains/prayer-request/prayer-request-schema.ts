import yup from 'utils/yup';

export const CreatePrayerRequestSchema = yup.object().shape({
	name: yup.string().required(),
	description: yup.string().required(),
});

export const UpdatePrayerRequestSchema = yup.object().shape({
	name: yup.string(),
	description: yup.string(),
});
