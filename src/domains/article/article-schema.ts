import yup from 'utils/yup';

export const CreateArticleSchema = yup.object().shape({
	title: yup.string().required(),
	status: yup.string().required(),
	body: yup.string().required(),
});

export const UpdateArticleSchema = yup.object().shape({
	title: yup.string(),
	status: yup.string(),
	body: yup.string(),
});
