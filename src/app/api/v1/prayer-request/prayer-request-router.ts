import { Router } from 'express';
import { CreatePrayerRequestSchema, UpdatePrayerRequestSchema } from 'domains/prayer-request/prayer-request-schema';
import { validate, auth } from 'app/middlewares';
import { makeUuidSchema } from 'domains/common/common-schema';
import * as controller from './prayer-request-controller';

const base = Router();
const router = Router();

router.get('/', controller.index);
router.get('/:uuid', validate.params(makeUuidSchema('uuid')), controller.show);
router.post('/', validate.body(CreatePrayerRequestSchema), controller.create);
router.patch(
	'/:uuid',
	validate.params(makeUuidSchema('uuid')),
	validate.body(UpdatePrayerRequestSchema, { canBeEmpty: false }),
	controller.update
);
router.delete('/:uuid', validate.params(makeUuidSchema('uuid')), controller.destroy);

base.use('/prayer-requests', auth(), router);

export { base as router };
