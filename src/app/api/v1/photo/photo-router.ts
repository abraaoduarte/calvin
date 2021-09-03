import { Router } from 'express';
import { CreatePhotoSchema, UpdatePhotoSchema } from 'domains/photo/photo-schema';
import { validate, auth } from 'app/middlewares';
import { makeUuidSchema } from 'domains/common/common-schema';
import * as controller from './photo-controller';

const base = Router();
const router = Router();

router.get('/', controller.index);
router.get('/:uuid', validate.params(makeUuidSchema('uuid')), controller.show);
router.post('/', validate.body(CreatePhotoSchema), controller.create);
router.patch(
	'/:uuid',
	validate.params(makeUuidSchema('uuid')),
	validate.body(UpdatePhotoSchema, { canBeEmpty: false }),
	controller.update
);
router.delete('/:uuid', validate.params(makeUuidSchema('uuid')), controller.destroy);

base.use('/photos', auth(), router);

export { base as router };
