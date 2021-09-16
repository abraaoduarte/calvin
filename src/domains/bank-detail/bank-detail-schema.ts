import yup from 'utils/yup';

export const CreateBankDetailSchema = yup.object().shape({
	name: yup.string().required(),
	agency: yup.string().required(),
	account: yup.string().required(),
	document: yup.string().required(),
	owner: yup.string().required(),
});

export const UpdateBankDetailSchema = yup.object().shape({
	name: yup.string().required(),
	agency: yup.string().required(),
	account: yup.string().required(),
	document: yup.string().required(),
	owner: yup.string().required(),
});
