import { Router } from 'express';
import { validate, auth } from 'app/middlewares';
import { CreateRoleSchema, UpdateRoleSchema } from 'domains/role/role-schema';
import { makeUuidSchema } from 'domains/common/common-schema';
import * as controller from './role-controller';

const base = Router();
const router = Router();

router.get('/', controller.index);
router.get('/:uuid', validate.params(makeUuidSchema('uuid')), controller.show);
router.post('/', validate.body(CreateRoleSchema), controller.create);
router.patch(
	'/:uuid',
	validate.params(makeUuidSchema('uuid')),
	validate.body(UpdateRoleSchema, { canBeEmpty: false }),
	controller.update
);
router.delete('/:uuid', validate.params(makeUuidSchema('uuid')), controller.destroy);

base.use('/roles', auth(), router);

export { base as router };
