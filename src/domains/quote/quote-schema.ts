import yup from 'utils/yup';

export const CreateQuoteSchema = yup.object().shape({
	title: yup.string().required(),
});

export const UpdateQuoteSchema = yup.object().shape({
	title: yup.string(),
});
