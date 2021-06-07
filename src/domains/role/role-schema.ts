import yup from 'utils/yup';

export const CreateRoleSchema = yup.object().shape({
	name: yup.string().required(),
});

export const UpdateRoleSchema = yup.object().shape({
	name: yup.string(),
	permissions: yup.array().of(yup.string().uuid()),
});
