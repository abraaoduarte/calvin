import { Router } from 'express';
import { validate } from 'app/middlewares/validate';
import { CreateRoleSchema, UpdateRoleSchema } from 'domains/role/role-schema';
import { makeUuidSchema } from 'domains/common/common-schema';
import * as controller from './role-controller';

const base = Router();
const router = Router();

router.get('/', controller.index);
router.get('/:uuid', validate.params(makeUuidSchema('roleUuid'), {}), controller.show);
router.post('/', validate.body(CreateRoleSchema, {}), controller.create);
router.patch(
	'/:uuid',
	validate.params(makeUuidSchema('roleUuid'), {}),
	validate.body(UpdateRoleSchema, { canBeEmpty: false }),
	controller.update
);
router.delete('/:uuid', validate.params(makeUuidSchema('roleUuid'), {}), controller.destroy);

base.use('/roles', router);

export { base as router };
