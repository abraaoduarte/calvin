import yup from 'utils/yup';

export const CreateUserSchema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().required().email(),
	password: yup.string().required(),
	passwordConfirmation: yup
		.string()
		.required()
		.oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const UpdateUserSchema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().email(),
	password: yup.string(),
	passwordConfirmation: yup
		.string()
		.when('password', {
			is: (password) => !!password,
			then: yup.string().required(),
		})
		.oneOf([yup.ref('password'), null], 'Passwords must match'),
});
