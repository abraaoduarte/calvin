import yup from 'utils/yup';

export const CreateArticleSchema = yup.object().shape({
	title: yup.string().required(),
	slug: yup.string().required(),
	status: yup.string().required(),
	body: yup.string().required(),
	author_id: yup.string().uuid().required(),
});

export const UpdateArticleSchema = yup.object().shape({
	title: yup.string().required(),
	slug: yup.string().required(),
	status: yup.string().required(),
	body: yup.string().required(),
	author_id: yup.string().uuid().required(),
});
