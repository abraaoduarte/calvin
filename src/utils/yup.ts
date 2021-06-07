import * as yup from 'yup';
import { pt } from 'yup-locale-pt';
import { string } from 'yup-locale-pt/lib/locale';

yup.setLocale({
	...pt,
	string: {
		...string,
		// eslint-disable-next-line no-template-curly-in-string
		uuid: '${path} deve ser UUID v4 válido',
	},
});

export default yup;
