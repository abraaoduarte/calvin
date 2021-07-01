import { Router } from 'express';
import { CreateEventSchema, UpdateEventSchema } from 'domains/event/event-schema';
import { validate } from 'app/middlewares/validate';
import { makeUuidSchema } from 'domains/common/common-schema';
import * as controller from './event-controller';

const base = Router();
const router = Router();

router.get('/', controller.index);
router.get('/:uuid', validate.params(makeUuidSchema('uuid')), controller.show);
router.post('/', validate.body(CreateEventSchema), controller.create);
router.patch(
	'/:uuid',
	validate.params(makeUuidSchema('uuid')),
	validate.body(UpdateEventSchema, { canBeEmpty: false }),
	controller.update
);
router.delete('/:uuid', validate.params(makeUuidSchema('uuid')), controller.destroy);

base.use('/events', router);

export { base as router };
