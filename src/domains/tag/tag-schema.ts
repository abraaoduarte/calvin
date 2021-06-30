import yup from 'utils/yup';

export const CreateTagSchema = yup.object().shape({
	title: yup.string().required(),
});

export const UpdateTagSchema = yup.object().shape({
	title: yup.string(),
});
