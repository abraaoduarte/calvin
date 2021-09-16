import { Router } from 'express';
import { validate, auth } from 'app/middlewares';
import { CreatePermissionSchema, UpdatePermissionSchema } from 'domains/permission/permission-schema';
import { makeUuidSchema } from 'domains/common/common-schema';
import * as controller from './permission-controller';

const base = Router();
const router = Router();

router.get('/', controller.index);
router.get('/:uuid', validate.params(makeUuidSchema('uuid')), controller.show);
router.post('/', validate.body(CreatePermissionSchema), controller.create);
router.patch(
	'/:uuid',
	validate.params(makeUuidSchema('uuid')),
	validate.body(UpdatePermissionSchema, { canBeEmpty: false }),
	controller.update
);
router.delete('/:uuid', validate.params(makeUuidSchema('uuid')), controller.destroy);

base.use('/permissions', auth(), router);

export { base as router };
