import { Router } from 'express';
import { AuthSchema } from 'domains/auth/auth-schema';
import { validate } from 'app/middlewares/validate';
import * as controller from './auth-controller';

const base = Router();
const router = Router();

router.post('/login', validate.body(AuthSchema), controller.login);
router.post('/refresh', controller.refresh);

base.use('/auth', router);

export { base as router };
