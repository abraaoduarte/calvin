import { Router } from 'express';
import { CreateAuthorSchema, UpdateAuthorSchema } from 'domains/author/author-schema';
import { validate, auth } from 'app/middlewares';
import { makeUuidSchema } from 'domains/common/common-schema';
import * as controller from './author-controller';

const base = Router();
const router = Router();

router.get('/', controller.index);
router.get('/:uuid', validate.params(makeUuidSchema('uuid')), controller.show);
router.post('/', validate.body(CreateAuthorSchema), controller.create);
router.patch(
	'/:uuid',
	validate.params(makeUuidSchema('uuid')),
	validate.body(UpdateAuthorSchema, { canBeEmpty: false }),
	controller.update
);
router.delete('/:uuid', validate.params(makeUuidSchema('uuid')), controller.destroy);

base.use('/authors', auth(), router);

export { base as router };
