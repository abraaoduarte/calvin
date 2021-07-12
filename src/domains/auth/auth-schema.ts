import yup from 'utils/yup';

const AuthSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

export { AuthSchema };
