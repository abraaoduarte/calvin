import yup from 'utils/yup';

export const CreateBankDetailSchema = yup.object().shape({
	name: yup.string().required(),
});

export const UpdateBankDetailSchema = yup.object().shape({
	name: yup.string(),
});
