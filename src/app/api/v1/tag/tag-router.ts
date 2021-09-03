import { Router } from 'express';
import { CreateTagSchema, UpdateTagSchema } from 'domains/tag/tag-schema';
import { validate, auth } from 'app/middlewares';
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

base.use('/tags', auth(), router);

export { base as router };
