import yup from 'utils/yup';

export const CreateEventSchema = yup.object().shape({
	title: yup.string().required(),
});

export const UpdateEventSchema = yup.object().shape({
	title: yup.string(),
});
