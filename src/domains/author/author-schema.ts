import yup from 'utils/yup';

export const CreateAuthorSchema = yup.object().shape({
	name: yup.string().required(),
	description: yup.string().required(),
});

export const UpdateAuthorSchema = yup.object().shape({
	name: yup.string(),
	description: yup.string(),
});
