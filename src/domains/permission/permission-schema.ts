import yup from 'utils/yup';

export const CreatePermissionSchema = yup.object().shape({
	name: yup.string().required(),
	readableName: yup.string().required(),
});

export const UpdatePermissionSchema = yup.object().shape({
	name: yup.string(),
	readableName: yup.string(),
});
