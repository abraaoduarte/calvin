import { Router } from 'express';
import { CreateVideoSchema, UpdateVideoSchema } from 'domains/video/video-schema';
import { validate } from 'app/middlewares/validate';
import { makeUuidSchema } from 'domains/common/common-schema';
import * as controller from './video-controller';

const base = Router();
const router = Router();

router.get('/', controller.index);
router.get('/:uuid', validate.params(makeUuidSchema('uuid')), controller.show);
router.post('/', validate.body(CreateVideoSchema), controller.create);
router.patch(
	'/:uuid',
	validate.params(makeUuidSchema('uuid')),
	validate.body(UpdateVideoSchema, { canBeEmpty: false }),
	controller.update
);
router.delete('/:uuid', validate.params(makeUuidSchema('uuid')), controller.destroy);

base.use('/videos', router);

export { base as router };
