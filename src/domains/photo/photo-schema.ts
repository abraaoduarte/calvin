import yup from 'utils/yup';

export const CreatePhotoSchema = yup.object().shape({
	title: yup.string().required(),
});

export const UpdatePhotoSchema = yup.object().shape({
	title: yup.string(),
});
