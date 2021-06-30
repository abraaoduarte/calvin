import { Router } from 'express';
import { CreateTagSchema, UpdateTagSchema } from 'domains/tag/tag-schema';
import { validate } from 'app/middlewares/validate';
import { makeUuidSchema } from 'domains/common/common-schema';
import * as controller from './tag-controller';

const base = Router();
const router = Router();

router.get('/', controller.index);
router.get('/:uuid', validate.params(makeUuidSchema('uuid')), controller.show);
router.post('/', validate.body(CreateTagSchema), controller.create);
router.patch(
	'/:uuid',
	validate.params(makeUuidSchema('uuid')),
	validate.body(UpdateTagSchema, { canBeEmpty: false }),
	controller.update
);
router.delete('/:uuid', validate.params(makeUuidSchema('uuid')), controller.destroy);

base.use('/tags', router);

export { base as router };
