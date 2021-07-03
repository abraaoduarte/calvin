import { Router } from 'express';
import { CreateUserSchema, UpdateUserSchema } from 'domains/user/user-schema';
import { validate } from 'app/middlewares/validate';
import { makeUuidSchema } from 'domains/common/common-schema';
import * as controller from './user-controller';

const base = Router();
const router = Router();

router.get('/', controller.index);
router.get('/:uuid', validate.params(makeUuidSchema('uuid')), controller.show);
router.post('/', validate.body(CreateUserSchema), controller.create);
router.patch('/:uuid', validate.params(makeUuidSchema('uuid')), validate.body(UpdateUserSchema), controller.update);
router.delete('/:uuid', controller.destroy);

base.use('/users', router);

export { base as router };
