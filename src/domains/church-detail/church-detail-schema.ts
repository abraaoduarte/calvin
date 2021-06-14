import yup from 'utils/yup';

export const CreateChurchDetailSchema = yup.object().shape({
	name: yup.string().required(),
	category: yup.string().required(),
	body: yup.string().required(),
});

export const UpdateChurchDetailSchema = yup.object().shape({
	name: yup.string(),
	category: yup.string(),
	body: yup.string(),
});
