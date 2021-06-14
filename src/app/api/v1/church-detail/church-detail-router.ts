import { Router } from 'express';
import { validate } from 'app/middlewares/validate';
import { CreateChurchDetailSchema, UpdateChurchDetailSchema } from 'domains/church-detail/church-detail-schema';
import { makeUuidSchema } from 'domains/common/common-schema';
import * as controller from './church-detail-controller';

const base = Router();
const router = Router();

router.get('/', controller.index);
router.get('/:uuid', validate.params(makeUuidSchema('uuid')), controller.show);
router.post('/', validate.body(CreateChurchDetailSchema), controller.create);
router.patch(
	'/:uuid',
	validate.params(makeUuidSchema('uuid')),
	validate.body(UpdateChurchDetailSchema, { canBeEmpty: false }),
	controller.update
);
router.delete('/:uuid', validate.params(makeUuidSchema('uuid')), controller.destroy);

base.use('/church-details', router);

export { base as router };
