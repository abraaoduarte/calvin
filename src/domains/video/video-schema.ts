import yup from 'utils/yup';

export const CreateVideoSchema = yup.object().shape({
	name: yup.string().required(),
	description: yup.string().required(),
});

export const UpdateVideoSchema = yup.object().shape({
	name: yup.string(),
	description: yup.string(),
});
