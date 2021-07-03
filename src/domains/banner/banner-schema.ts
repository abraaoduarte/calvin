import yup from 'utils/yup';

export const CreateBannerSchema = yup.object().shape({
	title: yup.string().required(),
});

export const UpdateBannerSchema = yup.object().shape({
	title: yup.string(),
});
