import yup from 'utils/yup';

export const CreateArticleSchema = yup.object().shape({
	title: yup.string().required(),
	slug: yup.string().required(),
	status: yup.string().required(),
	body: yup.string().required(),
	author_id: yup.string().uuid().required(),
	tags: yup.array()
		.min(1, "Você não pode deixar este campo em branco.")
		.required()
});

export const UpdateArticleSchema = yup.object().shape({
	title: yup.string().required(),
	slug: yup.string().required(),
	status: yup.string().required(),
	body: yup.string().required(),
	author_id: yup.string().uuid().required(),
	tags: yup.array()
		.min(1, "Você não pode deixar este campo em branco.")
		.required()
});
